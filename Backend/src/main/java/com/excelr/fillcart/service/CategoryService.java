package com.excelr.fillcart.service;

import com.excelr.fillcart.model.Category;
import com.excelr.fillcart.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    
    //create
    public String saveCategory(Category category) {
        Optional<Category> response = categoryRepository.findByName(category.getName());
        if(response.isPresent()){
            return "EXISTS";
        }
        categoryRepository.save(category);
        return "CREATED";
    }

    // Get all Categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get a Category by ID
    public Optional<Category> getCategoryById(long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    // Delete a Category by ID
    public void deleteCategoryById(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    public String updateCategory(Category category) {
        categoryRepository.save(category);
        return "UPDATED";
    }
}
