package com.distribution.backend.service;

import com.distribution.backend.dto.DeliveryDto;
import com.distribution.backend.entity.Delivery;

import java.util.List;

public interface DeliveryService {
    Delivery createDelivery(DeliveryDto dto);
    Delivery getDeliveryById(Long id);
    List<Delivery> getAllDeliveries();
    Delivery updateDelivery(Long id, DeliveryDto dto);
    void deleteDelivery(Long id);
}