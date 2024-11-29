package com.excelr.fillcart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductReqDto {
    private String name;
    private int stock;
    private String category;
    private String description;
    private double price;
    private String images;
}
