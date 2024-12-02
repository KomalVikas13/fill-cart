package com.excelr.fillcart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {
    private double rating;
    private String comment;
    private Long userId;
    private Long productId;
}
