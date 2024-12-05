package com.excelr.fillcart.service;

import com.excelr.fillcart.dto.OrderDto;
import com.excelr.fillcart.dto.OrderItemDto;
import com.excelr.fillcart.dto.PaymentResponse;
import com.excelr.fillcart.model.Order;
import com.excelr.fillcart.model.Product;
import com.excelr.fillcart.model.User;
import com.excelr.fillcart.repository.OrderRepository;
import com.excelr.fillcart.repository.ProductRepository;
import com.excelr.fillcart.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public PaymentResponse placeOrder(OrderDto dto) {
        // Fetch user
        Optional<User> userOpt = userRepo.findById(dto.getUserId());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found to place order");
        }
        boolean isStockAvailable = validateStockAvailability(dto.getOrderItems());
        if (!isStockAvailable) {
            throw new RuntimeException("Insufficient stock for one or more items");
        }

        // Create Order entity
        User user = userOpt.get();
        Order order = new Order();
        order.setTotalAmount(dto.getTotalAmount());
        order.setOrderStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());
        order.setUser(user);

        // Save Order
        Order savedOrder = orderRepository.save(order);

        // Add Order Items
        orderItemService.addOrderItems(dto.getOrderItems(), savedOrder);

        // Fetch the order with items
        Order updatedOrder = orderRepository.findByIdWithOrderItems(savedOrder.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Debugging
        System.out.println("Order Items: " + updatedOrder.getOrderItems());

        // Initiate Payment
        try {
            return paymentService.initiatePayment(updatedOrder);
        } catch (Exception e) {
            throw new RuntimeException("Failed to initiate payment: " + e.getMessage(), e);
        }
    }
    private boolean validateStockAvailability(List<OrderItemDto> orderItems) {
        for (OrderItemDto item : orderItems) {
            // Assuming you have a method in ProductRepository to check stock
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStock() < item.getQuantity()) {
                return false; // Insufficient stock
            }
        }
        return true;
    }

    public List<Order> getOrders(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        return orderRepository.findByUser(user);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
