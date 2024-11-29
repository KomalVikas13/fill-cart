package com.excelr.fillcart.service;

import com.excelr.fillcart.dto.UserDto;
import com.excelr.fillcart.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserDtoService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User dtoToUser(UserDto dto){
        User user = new User();
        user.setFullName(dto.getFullName());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setEmail(dto.getEmail());
        user.setAddress(dto.getAddress());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));//BCrypt password
        user.setCreatedAt(LocalDateTime.now());
        return user;
    }
}
