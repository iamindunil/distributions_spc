package com.distribution.backend.service;

import com.distribution.backend.dto.RouteDto;
import com.distribution.backend.entity.Route;

import java.util.List;

public interface RouteService {
    Route createRoute(RouteDto dto);
    Route getRouteById(Long id);
    List<Route> getAllRoutes();
    Route updateRoute(Long id, RouteDto dto);
    void deleteRoute(Long id);
}