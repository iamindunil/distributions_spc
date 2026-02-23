package com.distribution.backend.service;

import com.distribution.backend.dto.LogisticsStatsDto;
import com.distribution.backend.dto.VehicleDto;
import com.distribution.backend.entity.Vehicle;
import java.util.List;

public interface VehicleService {
    Vehicle createVehicle(VehicleDto dto);
    Vehicle getVehicleById(Long id);
    List<Vehicle> getAllVehicles();
    Vehicle updateVehicle(Long id, VehicleDto dto);
    void deleteVehicle(Long id);
    LogisticsStatsDto getLogisticsStats();
}
