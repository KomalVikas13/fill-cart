package com.excelr.fillcart.service;

import com.excelr.fillcart.dto.ProductReqDto;
import com.excelr.fillcart.dto.ProductResDto;
import com.excelr.fillcart.model.Category;
import com.excelr.fillcart.model.Product;
import com.excelr.fillcart.repository.CategoryRepository;
import com.excelr.fillcart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductImageService productImageService;

    public Page<ProductResDto> getLimitedProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size); // Define pagination

        // Fetch paginated products and map to ProductResDto
        return productRepository.findAll(pageable)
                .map(product -> new ProductResDto(
                        product.getProductId(),
                        product.getName(),
                        product.getDescription(),
                        product.getPrice(),
                        product.getStock(),
                        product.getRating(),
                        product.getCreatedAt(),
                        product.getCategory().getName(),
                        product.getImages()
                ));
    }


    @Transactional
    public String addProduct(ProductReqDto dto) {
        Optional<Category> categoryOptional = categoryRepository.findByName(dto.getCategory());
        Category category = categoryOptional.orElseThrow(() -> new RuntimeException("Category does not exist"));

        Boolean response = productRepository.existsByNameAndCategory(dto.getName(), category);
        if (response) {
            throw new RuntimeException("Product with this name already exists in the selected category");
        }

        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setCategory(category);
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setRating(0);
        product.setCreatedAt(LocalDateTime.now());

        Product savedProduct = productRepository.save(product);
        String imageResponse = productImageService.addProductImage(dto.getImages(), savedProduct);

        if (!"CREATED".equals(imageResponse)) {
            throw new RuntimeException("Failed to save product image: " + imageResponse);
        }

        return "CREATED";
    }


    public String updateProduct(ProductReqDto dto, Long id) {
        Optional<Category> category = categoryRepository.findByName(dto.getCategory());
        if (category.isEmpty()) {
            throw new RuntimeException("Category does not exist");
        }

        Optional<Product> existingProductOpt = productRepository.findById(id);
        if (existingProductOpt.isEmpty()) {
            throw new RuntimeException("Product not found");
        }
        Product existingProduct = existingProductOpt.get();
        existingProduct.setName(dto.getName());
        existingProduct.setDescription(dto.getDescription());
        existingProduct.setCategory(category.get());
        existingProduct.setPrice(dto.getPrice());
        existingProduct.setStock(dto.getStock());
        existingProduct.setRating(0);
        existingProduct.setNumberOfRatings(0L);
        existingProduct.setCreatedAt(existingProduct.getCreatedAt());
        Product savedProduct = productRepository.save(existingProduct);
        String imageResponse = productImageService.addProductImage(dto.getImages(), savedProduct);

        if (!"CREATED".equals(imageResponse)) {
            throw new RuntimeException("Failed to save product image: " + imageResponse);
        }
        return "UPDATED";
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        List<Product> response = productRepository.findByCategory_CategoryId(categoryId);
        if(response.isEmpty()){
            throw new RuntimeException("No products found");
        }

        return response;
    }
}
