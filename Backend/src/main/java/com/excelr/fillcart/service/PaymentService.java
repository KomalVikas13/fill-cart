package com.excelr.fillcart.service;

import com.excelr.fillcart.dto.PaymentResponse;
import com.excelr.fillcart.model.Order;
import com.excelr.fillcart.model.OrderItem;
import com.excelr.fillcart.model.Payment;
import com.excelr.fillcart.model.Product;
import com.excelr.fillcart.repository.OrderRepository;
import com.excelr.fillcart.repository.PaymentRepository;
import com.excelr.fillcart.repository.ProductRepository;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public PaymentResponse initiatePayment(Order order) throws Exception {
        // Validate order items
        List<OrderItem> items = order.getOrderItems();
        if (items == null || items.isEmpty()) {
            throw new RuntimeException("No order items found for the payment.");
        }

        // Create Stripe Checkout session
        SessionCreateParams.LineItem[] lineItems = items.stream()
                .map(item -> SessionCreateParams.LineItem.builder()
                        .setQuantity((long) item.getQuantity())
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount((long) (item.getPrice() * 100)) // Convert to cents
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName(item.getProduct().getName())
                                        .build())
                                .build())
                        .build())
                .toArray(SessionCreateParams.LineItem[]::new);

        // Create session
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/payments/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl("http://localhost:5173/payments/cancel")
                .addAllLineItem(List.of(lineItems))
                .putMetadata("order_id", String.valueOf(order.getOrderId()))  // Set order_id in metadata
                .build();

        Session session = Session.create(params);

        // Return payment details
        PaymentResponse response = new PaymentResponse();
        response.setPaymentUrl(session.getUrl());
        response.setPaymentId(session.getId());
        return response;
    }

    // Method to process payment and save payment details
    public String processPayment(Session session) {
        try {
            // Check if the payment was successful
            if ("paid".equals(session.getPaymentStatus())) {
                // Use the metadata (order_id) passed with the session to find the order
                String orderId = session.getMetadata().get("order_id");
                Order order = orderRepository.findById(Long.parseLong(orderId))
                        .orElseThrow(() -> new RuntimeException("Order not found"));

                // Update the order status to 'PAID'
                order.setOrderStatus("PAID");
                orderRepository.save(order);

                // Reduce stock for each product in the order
                for (OrderItem orderItem : order.getOrderItems()) {
                    Product product = orderItem.getProduct();
                    int newStock = product.getStock() - orderItem.getQuantity();
                    if (newStock < 0) {
                        throw new RuntimeException("Insufficient stock for product: " + product.getName());
                    }
                    product.setStock(newStock);  // Reduce stock
                    productRepository.save(product);  // Save updated product stock
                }

                // Create a new Payment entity
                Payment payment = new Payment();
                payment.setAmount(session.getAmountTotal() / 100.0); // Convert amount from cents to dollars
                payment.setPaymentMethod(session.getPaymentMethodTypes().get(0)); // Assuming one payment method
                payment.setPaymentStatus("PAID");
                payment.setPaymentDate(LocalDateTime.now());
                payment.setOrder(order);

                // Save the payment in the database
                paymentRepository.save(payment);

                return "Payment successful.";
            } else {
                return "Payment failed.";
            }
        } catch (Exception e) {
            return "Error processing payment: " + e.getMessage();
        }
    }
}
