package com.distribution.backend.dto;

public class VehicleDto {
    private String driver;
    private String route;
    private String status;
    private Integer capacity;

    // Getters & Setters
    public String getDriver() { return driver; }
    public void setDriver(String driver) { this.driver = driver; }

    public String getRoute() { return route; }
    public void setRoute(String route) { this.route = route; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
}
