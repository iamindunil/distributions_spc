package com.distribution.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String driver;
    private String route;
    private String status; // e.g., "Active", "Inactive", "Maintenance"
    private int capacity;

    // Constructors
    public Vehicle() {}

    public Vehicle(String driver, String route, String status, int capacity) {
        this.driver = driver;
        this.route = route;
        this.status = status;
        this.capacity = capacity;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDriver() { return driver; }
    public void setDriver(String driver) { this.driver = driver; }

    public String getRoute() { return route; }
    public void setRoute(String route) { this.route = route; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
}
