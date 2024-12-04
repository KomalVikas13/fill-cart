package com.excelr.fillcart.service;

import com.excelr.fillcart.dto.CartItemDeleteRequest;
import com.excelr.fillcart.dto.CartRequest;
import com.excelr.fillcart.model.Cart;
import com.excelr.fillcart.model.User;
import com.excelr.fillcart.repository.CartRepository;
import com.excelr.fillcart.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private UserRepo userRepo;

    public String addToCart(CartRequest cartRequest) {
        User user = userRepo.findById(cartRequest.getUserId())
                .orElseThrow(()->new RuntimeException("User not found with Id : " + cartRequest.getUserId()));
        Optional<Cart> cartByUser = cartRepository.findByUser_UserId(cartRequest.getUserId());
        if(cartByUser.isEmpty()){
            Cart cart = new Cart();
            cart.setCartItems(null);
            cart.setUser(user);
            cart.setCreatedAt(LocalDateTime.now());
            Cart saved = cartRepository.save(cart);
            String response = cartItemService.addCartItems(cartRequest.getCartItemRequestList(),saved);
            if(!Objects.equals(response, "Cart items added")){
                throw new RuntimeException(response);
            }
            return response;
        }
        String response = cartItemService.addCartItems(cartRequest.getCartItemRequestList(),cartByUser.get());
        if(!Objects.equals(response, "Cart items added")){
            throw new RuntimeException(response);
        }
        return response;
    }

    public Cart getCart(Long userId) {
        userRepo.findById(userId)
                .orElseThrow(()->new EntityNotFoundException("User not found with Id : " + userId));
        return cartRepository.findByUser_UserId(userId)
                 .orElseThrow(()->new EntityNotFoundException("Cart not found"));
    }

}
