package com.excelr.fillcart.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartRequest {
    private Long userId;
    private List<CartItemRequest> cartItemRequestList;
}
