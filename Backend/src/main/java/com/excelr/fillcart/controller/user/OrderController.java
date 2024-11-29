package com.excelr.fillcart.controller.user;

import com.excelr.fillcart.dto.OrderDto;
import com.excelr.fillcart.dto.PaymentResponse;
import com.excelr.fillcart.model.Order;
import com.excelr.fillcart.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderDto dto){
        try{
            PaymentResponse response = orderService.placeOrder(dto);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getOrders(@PathVariable Long userId){
        try{
            List<Order> response = orderService.getOrders(userId);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
}
