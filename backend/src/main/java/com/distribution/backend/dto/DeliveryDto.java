package com.distribution.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DeliveryDto {
    private Long id;
    private String orderNumber;
    private Long vehicleId;
    private Long routeId;
    private String status;
    private LocalDateTime plannedDate;
    private LocalDateTime actualDeliveryDate;
    private String delayReason;
}