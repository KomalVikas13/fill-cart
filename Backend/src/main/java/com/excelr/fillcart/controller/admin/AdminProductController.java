package com.excelr.fillcart.controller.admin;

import com.excelr.fillcart.dto.ProductReqDto;
import com.excelr.fillcart.dto.ProductResDto;
import com.excelr.fillcart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/admin/products")
public class AdminProductController {

    @Autowired
    private ProductService productService;


    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody ProductReqDto dto){
        System.out.println(dto);
        try {
            String response = productService.addProduct(dto);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@RequestBody ProductReqDto dto, @PathVariable Long id){
        try {
            String response = productService.updateProduct(dto,id);
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
