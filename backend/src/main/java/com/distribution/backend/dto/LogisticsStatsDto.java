package com.distribution.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LogisticsStatsDto {

    private static final long serialVersionUID = 1L;

    @JsonProperty("totalVehicles")
    private int totalVehicles;

    @JsonProperty("activeVehicles")
    private int activeVehicles;

    @JsonProperty("totalRoutes")
    private int totalRoutes;

    @JsonProperty("onTimeDeliveries")
    private int onTimeDeliveries;

    @JsonProperty("delayedDeliveries")
    private int delayedDeliveries;

    // Constructor matching your original usage
    public LogisticsStatsDto(int totalVehicles, int activeVehicles,
                             int totalRoutes, int onTimeDeliveries,
                             int delayedDeliveries) {
        this.totalVehicles = totalVehicles;
        this.activeVehicles = activeVehicles;
        this.totalRoutes = totalRoutes;
        this.onTimeDeliveries = onTimeDeliveries;
        this.delayedDeliveries = delayedDeliveries;
    }

    // Default constructor
    public LogisticsStatsDto() {
    }

    // Getters & Setters
    public int getTotalVehicles() {
        return totalVehicles;
    }

    public void setTotalVehicles(int totalVehicles) {
        this.totalVehicles = totalVehicles;
    }

    public int getActiveVehicles() {
        return activeVehicles;
    }

    public void setActiveVehicles(int activeVehicles) {
        this.activeVehicles = activeVehicles;
    }

    public int getTotalRoutes() {
        return totalRoutes;
    }

    public void setTotalRoutes(int totalRoutes) {
        this.totalRoutes = totalRoutes;
    }

    public int getOnTimeDeliveries() {
        return onTimeDeliveries;
    }

    public void setOnTimeDeliveries(int onTimeDeliveries) {
        this.onTimeDeliveries = onTimeDeliveries;
    }

    public int getDelayedDeliveries() {
        return delayedDeliveries;
    }

    public void setDelayedDeliveries(int delayedDeliveries) {
        this.delayedDeliveries = delayedDeliveries;
    }

    // Optional: computed success rate (percentage)
    public double getDeliverySuccessRate() {
        int total = onTimeDeliveries + delayedDeliveries;
        if (total == 0) {
            return 0.0;
        }
        return (double) onTimeDeliveries / total * 100;
    }

    @Override
    public String toString() {
        return "LogisticsStatsDto{" +
                "totalVehicles=" + totalVehicles +
                ", activeVehicles=" + activeVehicles +
                ", totalRoutes=" + totalRoutes +
                ", onTimeDeliveries=" + onTimeDeliveries +
                ", delayedDeliveries=" + delayedDeliveries +
                '}';
    }
}