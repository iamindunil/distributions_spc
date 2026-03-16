package com.distribution.backend.dto;

import lombok.Data;

@Data
public class DistributorDto {
    private Long id;
    private String email;
    private String businessName;
    private String ownerName;
    private String address;
    private String phone;
    private String registrationNumber;
    private String status;
    private Long approvedById;
    private boolean active;
}