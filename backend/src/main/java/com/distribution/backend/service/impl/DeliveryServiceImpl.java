package com.distribution.backend.service.impl;

import com.distribution.backend.dto.DeliveryDto;
import com.distribution.backend.entity.Delivery;
import com.distribution.backend.entity.Route;
import com.distribution.backend.entity.Vehicle;
import com.distribution.backend.repository.DeliveryRepository;
import com.distribution.backend.repository.RouteRepository;
import com.distribution.backend.repository.VehicleRepository;
import com.distribution.backend.service.DeliveryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DeliveryServiceImpl implements DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final VehicleRepository vehicleRepository;
    private final RouteRepository routeRepository;

    public DeliveryServiceImpl(DeliveryRepository deliveryRepository,
                               VehicleRepository vehicleRepository,
                               RouteRepository routeRepository) {
        this.deliveryRepository = deliveryRepository;
        this.vehicleRepository = vehicleRepository;
        this.routeRepository = routeRepository;
    }

    @Override
    @Transactional
    public Delivery createDelivery(DeliveryDto dto) {
        Delivery delivery = new Delivery();
        delivery.setOrderNumber(dto.getOrderNumber());
        delivery.setStatus(dto.getStatus() != null ? dto.getStatus() : "Pending");
        delivery.setPlannedDate(dto.getPlannedDate());

        if (dto.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                    .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));
            delivery.setVehicle(vehicle);
        }

        if (dto.getRouteId() != null) {
            Route route = routeRepository.findById(dto.getRouteId())
                    .orElseThrow(() -> new IllegalArgumentException("Route not found"));
            delivery.setRoute(route);
        }

        return deliveryRepository.save(delivery);
    }

    @Override
    public Delivery getDeliveryById(Long id) {
        return deliveryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Delivery not found"));
    }

    @Override
    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    @Override
    @Transactional
    public Delivery updateDelivery(Long id, DeliveryDto dto) {
        Delivery delivery = getDeliveryById(id);

        if (dto.getOrderNumber() != null) delivery.setOrderNumber(dto.getOrderNumber());
        if (dto.getStatus() != null) delivery.setStatus(dto.getStatus());
        if (dto.getPlannedDate() != null) delivery.setPlannedDate(dto.getPlannedDate());
        if (dto.getActualDeliveryDate() != null) delivery.setActualDeliveryDate(dto.getActualDeliveryDate());
        if (dto.getDelayReason() != null) delivery.setDelayReason(dto.getDelayReason());

        // Update vehicle/route if IDs provided
        if (dto.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                    .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));
            delivery.setVehicle(vehicle);
        }
        if (dto.getRouteId() != null) {
            Route route = routeRepository.findById(dto.getRouteId())
                    .orElseThrow(() -> new IllegalArgumentException("Route not found"));
            delivery.setRoute(route);
        }

        return deliveryRepository.save(delivery);
    }

    @Override
    @Transactional
    public void deleteDelivery(Long id) {
        if (!deliveryRepository.existsById(id)) {
            throw new IllegalArgumentException("Delivery not found");
        }
        deliveryRepository.deleteById(id);
    }
}