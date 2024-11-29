package com.excelr.fillcart.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderDto {
    private double totalAmount;
    private long userId;
    private List<OrderItemDto> orderItems;
}
