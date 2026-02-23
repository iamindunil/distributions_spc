package com.distribution.backend.service.impl;

import com.distribution.backend.dto.VehicleDto;
import com.distribution.backend.dto.LogisticsStatsDto;
import com.distribution.backend.entity.Vehicle;
import com.distribution.backend.repository.VehicleRepository;
import com.distribution.backend.service.VehicleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository repository;

    public VehicleServiceImpl(VehicleRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public Vehicle createVehicle(VehicleDto dto) {
        validateRequiredFields(dto);

        Vehicle vehicle = new Vehicle();
        vehicle.setDriver(dto.getDriver().trim());
        vehicle.setRoute(dto.getRoute().trim());
        vehicle.setStatus(dto.getStatus().trim());
        vehicle.setCapacity(dto.getCapacity() != null ? dto.getCapacity() : 0);

        return repository.save(vehicle);
    }

    @Override
    public Vehicle getVehicleById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found with ID: " + id));
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Vehicle updateVehicle(Long id, VehicleDto dto) {
        Vehicle vehicle = getVehicleById(id);

        // Partial update - only update fields that are provided
        if (dto.getDriver() != null && !dto.getDriver().trim().isEmpty()) {
            vehicle.setDriver(dto.getDriver().trim());
        }
        if (dto.getRoute() != null && !dto.getRoute().trim().isEmpty()) {
            vehicle.setRoute(dto.getRoute().trim());
        }
        if (dto.getStatus() != null && !dto.getStatus().trim().isEmpty()) {
            vehicle.setStatus(dto.getStatus().trim());
        }
        if (dto.getCapacity() != null) {
            if (dto.getCapacity() < 0 || dto.getCapacity() > 100) {
                throw new IllegalArgumentException("Capacity must be between 0 and 100%");
            }
            vehicle.setCapacity(dto.getCapacity());
        }

        return repository.save(vehicle);
    }

    @Override
    @Transactional
    public void deleteVehicle(Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Vehicle not found with ID: " + id);
        }
        repository.deleteById(id);
    }

    @Override
    public LogisticsStatsDto getLogisticsStats() {
        List<Vehicle> allVehicles = repository.findAll();

        long activeRoutes = allVehicles.stream()
                .filter(v -> "In Transit".equalsIgnoreCase(v.getStatus()))
                .count();

        long vehiclesOnDuty = allVehicles.stream()
                .filter(v -> !"Idle".equalsIgnoreCase(v.getStatus()) &&
                             !"Maintenance".equalsIgnoreCase(v.getStatus()))
                .count();

        // TODO: Replace with real logic when you have Delivery/Order entity
        long pendingDeliveries = 23;   // Mock value - update later
        long delayedDeliveries = 4;    // Mock value - update later

        return new LogisticsStatsDto(
                (int) activeRoutes,
                (int) vehiclesOnDuty,
                (int) pendingDeliveries,
                (int) delayedDeliveries
        );
    }

    // Bonus method - useful for filtering in logistics dashboard
    public List<Vehicle> getVehiclesByStatus(String status) {
        if (status == null || status.trim().isEmpty()) {
            return repository.findAll();
        }
        return repository.findByStatus(status);
    }

    // Private helper for validation
    private void validateRequiredFields(VehicleDto dto) {
        if (dto == null) {
            throw new IllegalArgumentException("Vehicle data cannot be null");
        }
        if (dto.getDriver() == null || dto.getDriver().trim().isEmpty()) {
            throw new IllegalArgumentException("Driver name is required");
        }
        if (dto.getRoute() == null || dto.getRoute().trim().isEmpty()) {
            throw new IllegalArgumentException("Route is required");
        }
        if (dto.getStatus() == null || dto.getStatus().trim().isEmpty()) {
            throw new IllegalArgumentException("Status is required");
        }
    }
}