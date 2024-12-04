package com.excelr.fillcart.service;

import com.excelr.fillcart.dto.ReviewRequest;
import com.excelr.fillcart.model.Product;
import com.excelr.fillcart.model.Review;
import com.excelr.fillcart.model.User;
import com.excelr.fillcart.repository.ProductRepository;
import com.excelr.fillcart.repository.ReviewRepository;
import com.excelr.fillcart.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepo userRepo;

    public String addReview(ReviewRequest reviewRequest) {
        // Fetch user and product
        User user = userRepo.findById(reviewRequest.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with user_id: " + reviewRequest.getUserId()));
        Product product = productRepository.findById(reviewRequest.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with product_id: " + reviewRequest.getProductId()));

        if(reviewRequest.getRating() > 5){
            throw new RuntimeException("Rating should not be greater than 5");
        }
        // Create and save the new review
        Review review = new Review();
        review.setRating(reviewRequest.getRating());
        review.setComment(reviewRequest.getComment());
        review.setUser(user);
        review.setUser(user);
        review.setProduct(product);
        review.setCreatedAt(LocalDateTime.now());
        reviewRepository.save(review);

        // Update the product's rating and number of ratings
        long currentNumberOfRatings = product.getNumberOfRatings() == null ? 0 : product.getNumberOfRatings();
        double currentRating = product.getRating() == 0 ? 0 : product.getRating();

        // Calculate the new average rating
        double newRating = ((currentRating * currentNumberOfRatings) + reviewRequest.getRating()) / (currentNumberOfRatings + 1);
        product.setRating(newRating);
        product.setNumberOfRatings(currentNumberOfRatings + 1);

        // Save the updated product
        productRepository.save(product);

        return "Review added and product rating updated for product with productId: " + product.getProductId();
    }

}
