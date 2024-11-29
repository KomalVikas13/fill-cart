package com.excelr.fillcart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto {
    private Long userId;
    private String fullName;
    private String phoneNumber;
    private String email;
    private String address;
}
