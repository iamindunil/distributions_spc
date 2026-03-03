package com.distribution.backend.controller;

import com.distribution.backend.dto.RouteDto;
import com.distribution.backend.entity.Route;
import com.distribution.backend.service.RouteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "http://localhost:3000")
public class RouteController {

    private final RouteService service;

    public RouteController(RouteService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Route> createRoute(@RequestBody RouteDto dto) {
        return ResponseEntity.ok(service.createRoute(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Route> getRoute(@PathVariable Long id) {
        return ResponseEntity.ok(service.getRouteById(id));
    }

    @GetMapping
    public ResponseEntity<List<Route>> getAllRoutes() {
        return ResponseEntity.ok(service.getAllRoutes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Route> updateRoute(@PathVariable Long id, @RequestBody RouteDto dto) {
        return ResponseEntity.ok(service.updateRoute(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoute(@PathVariable Long id) {
        service.deleteRoute(id);
        return ResponseEntity.noContent().build();
    }
}