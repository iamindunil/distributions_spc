package com.distribution.backend.service.impl;

import com.distribution.backend.dto.RouteDto;
import com.distribution.backend.entity.Route;
import com.distribution.backend.repository.RouteRepository;
import com.distribution.backend.service.RouteService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RouteServiceImpl implements RouteService {

    private final RouteRepository repository;

    public RouteServiceImpl(RouteRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public Route createRoute(RouteDto dto) {
        Route route = new Route();
        route.setName(dto.getName());
        route.setStartLocation(dto.getStartLocation());
        route.setEndLocation(dto.getEndLocation());
        route.setDistanceKm(dto.getDistanceKm());
        route.setEstimatedHours(dto.getEstimatedHours());
        route.setStatus(dto.getStatus() != null ? dto.getStatus() : "Active");
        return repository.save(route);
    }

    @Override
    public Route getRouteById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Route not found"));
    }

    @Override
    public List<Route> getAllRoutes() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Route updateRoute(Long id, RouteDto dto) {
        Route route = getRouteById(id);
        if (dto.getName() != null) route.setName(dto.getName());
        if (dto.getStartLocation() != null) route.setStartLocation(dto.getStartLocation());
        if (dto.getEndLocation() != null) route.setEndLocation(dto.getEndLocation());
        if (dto.getDistanceKm() != null) route.setDistanceKm(dto.getDistanceKm());
        if (dto.getEstimatedHours() != null) route.setEstimatedHours(dto.getEstimatedHours());
        if (dto.getStatus() != null) route.setStatus(dto.getStatus());
        return repository.save(route);
    }

    @Override
    @Transactional
    public void deleteRoute(Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Route not found");
        }
        repository.deleteById(id);
    }
}