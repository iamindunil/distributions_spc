package com.distribution.backend.dto;

public class EmployeeDto {
    private String Name;
    private String email;
    private String role;
    private boolean active;

    // Getters & Setters
    public String getName() { return Name; }
    public void setName(String Name) { this.Name = Name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
