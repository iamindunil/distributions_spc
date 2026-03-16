package com.distribution.backend.repository;

import com.distribution.backend.entity.Distributor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DistributorRepository extends JpaRepository<Distributor, Long> {

    // This is the missing method you need
    Optional<Distributor> findByEmail(String email);

    // Optional: more useful queries you can add later
    // boolean existsByEmail(String email);
    // boolean existsByRegistrationNumber(String registrationNumber);
}