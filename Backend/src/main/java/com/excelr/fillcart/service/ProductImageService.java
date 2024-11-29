package com.excelr.fillcart.service;

import com.excelr.fillcart.model.Product;
import com.excelr.fillcart.model.ProductImage;
import com.excelr.fillcart.repository.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class ProductImageService {

    @Autowired
    private ProductImageRepository productImageRepository;

    public String addProductImage(String images, Product product) {
        // Split the input string into individual image URLs
        String[] imageList = images.split(",");

        try {
            Arrays.stream(imageList).forEach(img -> {
                ProductImage productImage = new ProductImage();
                productImage.setImageUrl(img.trim()); // Use the split string `img` and trim whitespace
                productImage.setProduct(product);
                productImage.setAltText(product.getName());

                productImageRepository.save(productImage);
            });

            return "CREATED"; // Successfully saved all images

        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Data Integrity Issue: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Error saving product image: " + e.getMessage());
        }
    }

}
