package com.distribution.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String businessName;
    private String ownerName;
    private String address;
    private String phone;
    private String registrationNumber;
}