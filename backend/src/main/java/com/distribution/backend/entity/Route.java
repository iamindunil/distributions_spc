package com.distribution.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "routes")
@Getter
@Setter
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;               // e.g. "Colombo - Kandy Express"

    @Column(nullable = false)
    private String startLocation;

    @Column(nullable = false)
    private String endLocation;

    private Double distanceKm;

    private Integer estimatedHours;

    @Column(nullable = false)
    private String status;             // Active, Inactive, Under Maintenance
}