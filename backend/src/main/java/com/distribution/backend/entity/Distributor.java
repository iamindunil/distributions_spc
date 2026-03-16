package com.distribution.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "distributors")
@Getter
@Setter
public class Distributor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password; // hashed

    @Column(nullable = false)
    private String businessName;

    private String ownerName;
    private String address;
    private String phone;
    private String registrationNumber;

    @Enumerated(EnumType.STRING)
    private DistributorStatus status; // PENDING, APPROVED, REJECTED

    @ManyToOne
    @JoinColumn(name = "approved_by")
    private Employee approvedBy; // supply division employee

    private boolean active = true;
}

public enum DistributorStatus {
    PENDING, APPROVED, REJECTED
}