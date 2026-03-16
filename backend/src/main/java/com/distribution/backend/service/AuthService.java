package com.distribution.backend.service;

import com.distribution.backend.dto.RegisterRequest;
import com.distribution.backend.entity.Distributor;
import com.distribution.backend.entity.DistributorStatus;
import com.distribution.backend.repository.DistributorRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final DistributorRepository distributorRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(DistributorRepository distributorRepository, PasswordEncoder passwordEncoder) {
        this.distributorRepository = distributorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerDistributor(RegisterRequest request) {
        if (distributorRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        Distributor distributor = new Distributor();
        distributor.setEmail(request.getEmail());
        distributor.setPassword(passwordEncoder.encode(request.getPassword()));
        distributor.setBusinessName(request.getBusinessName());
        distributor.setOwnerName(request.getOwnerName());
        distributor.setAddress(request.getAddress());
        distributor.setPhone(request.getPhone());
        distributor.setRegistrationNumber(request.getRegistrationNumber());
        distributor.setStatus(DistributorStatus.PENDING);

        distributorRepository.save(distributor);
    }
}