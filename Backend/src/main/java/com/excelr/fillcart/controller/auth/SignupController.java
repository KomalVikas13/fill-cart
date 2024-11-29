package com.excelr.fillcart.controller.auth;

import com.excelr.fillcart.dto.UserDto;
import com.excelr.fillcart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class SignupController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserDto dto){
        try{
            String response = userService.createUser(dto);
            if(response.equals("EXISTS")){
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("User Already Exists");
            }
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Registration Successful");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Registration Failed");
        }


    }
}
