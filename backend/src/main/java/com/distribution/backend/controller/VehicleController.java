package com.distribution.backend.controller;

import com.distribution.backend.dto.VehicleDto;
import com.distribution.backend.entity.Vehicle;
import com.distribution.backend.service.VehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleController {

    private final VehicleService service;

    public VehicleController(VehicleService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@RequestBody VehicleDto dto) {
        return ResponseEntity.ok(service.createVehicle(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicle(@PathVariable Long id) {
        return ResponseEntity.ok(service.getVehicleById(id));
    }

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.ok(service.getAllVehicles());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody VehicleDto dto) {
        return ResponseEntity.ok(service.updateVehicle(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        service.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/logistics/stats")
    public ResponseEntity<LogisticsStatsDto> getLogisticsStats() {
        LogisticsStatsDto stats = vehicleService.getLogisticsStats();
        return ResponseEntity.ok(stats);
    }
}
