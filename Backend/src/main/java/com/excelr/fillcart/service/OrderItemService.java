package com.excelr.fillcart.service;

import com.excelr.fillcart.dto.OrderItemDto;
import com.excelr.fillcart.model.Order;
import com.excelr.fillcart.model.OrderItem;
import com.excelr.fillcart.model.Product;
import com.excelr.fillcart.repository.OrderItemRepository;
import com.excelr.fillcart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public String addOrderItems(List<OrderItemDto> orderItems, Order order) {
        for (OrderItemDto item : orderItems) {
            Optional<Product> productOpt = productRepository.findById(item.getProductId());
            if (productOpt.isEmpty()) {
                throw new RuntimeException("Product with ID " + item.getProductId() + " not found to place order.");
            }
            Product product = productOpt.get();

            // Create and populate OrderItem
            OrderItem orderItem = new OrderItem();
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());
            orderItem.setOrder(order);
            orderItem.setProduct(product);

            // Save OrderItem to the database
            orderItemRepository.save(orderItem);
        }

        // Refresh the Order entity to include newly added items
        order.setOrderItems(orderItemRepository.findByOrder(order));
        return "SUCCESS";
    }

}
