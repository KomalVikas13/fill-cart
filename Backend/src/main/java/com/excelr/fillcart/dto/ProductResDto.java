package com.excelr.fillcart.dto;

import com.excelr.fillcart.model.ProductImage;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ProductResDto {
    private long productId;
    private String name;
    private int stock;
    private String category;
    private String description;
    private double price;
    private List<ProductImage> image;
    private double rating;
    private LocalDateTime createdAt;

    public ProductResDto(Long productId, String name, String description, double price, int stock, double rating, LocalDateTime createdAt, String category, List<ProductImage> image) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.rating = rating;
        this.createdAt = createdAt;
        this.category = category;
        this.image = image;
    }
}
