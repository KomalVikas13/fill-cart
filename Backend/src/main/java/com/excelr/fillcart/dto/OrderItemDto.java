package com.excelr.fillcart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemDto {
    private int quantity;
    private double price;
    private long productId;
}
