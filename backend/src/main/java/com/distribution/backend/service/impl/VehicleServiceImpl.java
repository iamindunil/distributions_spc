package com.distribution.backend.service.impl;

import com.distribution.backend.dto.VehicleDto;
import com.distribution.backend.entity.Vehicle;
import com.distribution.backend.repository.VehicleRepository;
import com.distribution.backend.service.VehicleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository repository;

    public VehicleServiceImpl(VehicleRepository repository) {
        this.repository = repository;
    }

    @Override
    public Vehicle createVehicle(VehicleDto dto) {
        Vehicle vehicle = new Vehicle(dto.getDriver(), dto.getRoute(), dto.getStatus(), dto.getCapacity());
        return repository.save(vehicle);
    }

    @Override
    public Vehicle getVehicleById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        return repository.findAll();
    }

    @Override
    public Vehicle updateVehicle(Long id, VehicleDto dto) {
        Vehicle vehicle = getVehicleById(id);
        vehicle.setDriver(dto.getDriver());
        vehicle.setRoute(dto.getRoute());
        vehicle.setStatus(dto.getStatus());
        vehicle.setCapacity(dto.getCapacity());
        return repository.save(vehicle);
    }

    @Override
    public void deleteVehicle(Long id) {
        repository.deleteById(id);
    }
}
