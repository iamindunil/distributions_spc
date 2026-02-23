package com.distribution.backend.dto;

public class LogisticsStatsDto {
    private int totalVehicles;
    private int activeVehicles;
    private int totalRoutes;
    private int onTimeDeliveries;
    private int delayedDeliveries;

    // Getters and Setters

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
}
