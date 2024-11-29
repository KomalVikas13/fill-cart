package com.excelr.fillcart.repository;

import com.excelr.fillcart.model.Category;
import com.excelr.fillcart.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Boolean existsByNameAndCategory(String name, Category category);

    Page<Product> findAll(Pageable pageable);

    List<Product> findByCategory_CategoryId(Long categoryId);
}
