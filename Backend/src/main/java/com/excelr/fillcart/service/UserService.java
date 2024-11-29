package com.excelr.fillcart.service;

import com.excelr.fillcart.dto.UserDto;
import com.excelr.fillcart.dto.UserResponseDto;
import com.excelr.fillcart.model.User;
import com.excelr.fillcart.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserDtoService userDtoService;

    @Autowired
    private UserRepo userRepo;

    public String createUser(UserDto dto) {
        Optional<User> findUser = userRepo.findByEmail(dto.getEmail());
        if(findUser.isPresent()){
            return "EXISTS";
        }
        User user = userDtoService.dtoToUser(dto);
        user.setRole("ROLE_USER");
        try {
            User newUser = userRepo.save(user);
            return "CREATED";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public UserResponseDto getUserDetails(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(()->new EntityNotFoundException("User not found"));

        UserResponseDto userdto = new UserResponseDto();
        userdto.setEmail(user.getEmail());
        userdto.setFullName(user.getFullName());
        userdto.setAddress(user.getAddress());
        userdto.setUserId(user.getUserId());
        userdto.setPhoneNumber(user.getPhoneNumber());

        return userdto;
    }
}
