package com.excelr.fillcart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private String fullName;
    private String phoneNumber;
    private String email;
    private String address;
    private String password;
}
