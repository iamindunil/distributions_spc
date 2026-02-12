package com.distribution.backend.controller; 

import com.distribution.backend.dto.DashboardStatsDto;
import com.distribution.backend.repository.EmployeeRepository;
import com.distribution.backend.repository.VehicleRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin

public class DashboardController {
     private final EmployeeRepository employeeRepository;
    private final VehicleRepository vehicleRepository;

    public DashboardController(EmployeeRepository employeeRepository,
                               VehicleRepository vehicleRepository) {
        this.employeeRepository = employeeRepository;
        this.vehicleRepository = vehicleRepository;
    }

    @GetMapping("/stats")
    public DashboardStatsDto getStats() {

        long totalUsers = employeeRepository.count();
        long activeFleets = vehicleRepository.count();
        long pendingOrders = 12; // later connect real order table
        long alerts = 3;

        return new DashboardStatsDto(totalUsers, activeFleets, pendingOrders, alerts);
    }
}
    

