package com.distribution.backend.dto;

public class DashboardStatsDto {

    private long totalUsers;
    private long activeFleets;
    private long pendingOrders;
    private long alerts;

    public DashboardStatsDto(long totalUsers, long activeFleets, long pendingOrders, long alerts) {
        this.totalUsers = totalUsers;
        this.activeFleets = activeFleets;
        this.pendingOrders = pendingOrders;
        this.alerts = alerts;
    }

    public long getTotalUsers() { return totalUsers; }
    public long getActiveFleets() { return activeFleets; }
    public long getPendingOrders() { return pendingOrders; }
    public long getAlerts() { return alerts; }
}
