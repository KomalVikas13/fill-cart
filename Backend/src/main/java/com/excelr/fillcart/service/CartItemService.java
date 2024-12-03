package com.excelr.fillcart.service;

import com.excelr.fillcart.dto.CartItemRequest;
import com.excelr.fillcart.model.Cart;
import com.excelr.fillcart.model.CartItem;
import com.excelr.fillcart.model.Product;
import com.excelr.fillcart.repository.CartItemRepository;
import com.excelr.fillcart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public String addCartItems(List<CartItemRequest> cartItemRequestList, Cart cart) {
        try{
            cartItemRequestList.stream().forEach( item -> {
                Product product = productRepository.findById(item.getProductId())
                        .orElseThrow(()->new RuntimeException("Product not found with Id : " + item.getProductId()));
                CartItem cartItem = new CartItem();
                cartItem.setCart(cart);
                cartItem.setProduct(product);
                cartItem.setQuantity(item.getQuantity());
                cartItemRepository.save(cartItem);
            });

            return "Cart items added";
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
