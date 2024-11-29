package com.excelr.fillcart.controller.publicapi;

import com.excelr.fillcart.dto.ProductPage;
import com.excelr.fillcart.dto.ProductResDto;
import com.excelr.fillcart.model.Product;
import com.excelr.fillcart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<?> getLimitedProducts(@RequestBody ProductPage productPage){

        try {
            Page<ProductResDto> response = productService.getLimitedProducts(productPage.getPage(), productPage.getSize());
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable Long categoryId){
        try {
            List<Product> response = productService.getProductsByCategory(categoryId);
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
