package com.distribution.backend.dto;

import lombok.Data;

@Data
public class RouteDto {
    private Long id;
    private String name;
    private String startLocation;
    private String endLocation;
    private Double distanceKm;
    private Integer estimatedHours;
    private String status;
}