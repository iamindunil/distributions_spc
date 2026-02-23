// app/logistics/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { apiService } from "@/lib/api";
import { RefreshCw, Truck, Route, PackageCheck, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface LogisticsStats {
  activeRoutes: number;
  vehiclesOnDuty: number;
  pendingDeliveries: number;
  delayedDeliveries: number;
  lastUpdated?: string;
}

export default function LogisticsPage() {
  const [stats, setStats] = useState<LogisticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // For now we mock – replace with real API when backend is ready
      // const data = await apiService.getLogisticsStats();
      const mockData: LogisticsStats = {
        activeRoutes: 12,
        vehiclesOnDuty: 8,
        pendingDeliveries: 23,
        delayedDeliveries: 4,
        lastUpdated: new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setStats(mockData);
    } catch (err) {
      console.error("Failed to load logistics stats:", err);
      setError("Failed to load logistics overview. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();

    // Optional: auto-refresh every 60 seconds
    const interval = setInterval(loadStats, 60000);
    return () => clearInterval(interval);
  }, [loadStats]);

  const handleRefresh = () => loadStats();

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-slate-50 min-h-screen">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-red-600 text-lg">{error || "Failed to load data"}</p>
        <Button onClick={handleRefresh} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 lg:space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Logistics Overview
          </h1>
          <p className="text-slate-600 mt-1">
            Manage fleet movement, routes, and live distribution tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm text-slate-500">
            Last updated: {stats.lastUpdated || "just now"}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        <Card className="border-none shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700">
              <Route className="h-5 w-5 text-orange-600" />
              Active Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">{stats.activeRoutes}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700">
              <Truck className="h-5 w-5 text-blue-600" />
              Vehicles On Duty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats.vehiclesOnDuty}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700">
              <PackageCheck className="h-5 w-5 text-green-600" />
              Pending Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{stats.pendingDeliveries}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Delayed Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{stats.delayedDeliveries}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow p-6 border border-slate-100">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="gap-2 border-orange-200 hover:bg-orange-50">
            <Truck className="h-4 w-4" />
            Assign New Route
          </Button>
          <Button variant="outline" className="gap-2 border-orange-200 hover:bg-orange-50">
            <PackageCheck className="h-4 w-4" />
            View Pending Deliveries
          </Button>
          <Button variant="outline" className="gap-2 border-orange-200 hover:bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            Check Delays & Alerts
          </Button>
        </div>
      </div>

      {/* Placeholder for future live map / detailed list */}
      <div className="bg-white rounded-2xl shadow p-6 border border-slate-100 text-center py-12 text-slate-500">
        <Truck className="h-12 w-12 mx-auto mb-4 text-orange-400" />
        <h3 className="text-lg font-medium mb-2">Live Fleet Tracking</h3>
        <p className="text-sm">
          Real-time vehicle locations, route progress, and delivery status will appear here.
        </p>
        <p className="text-xs mt-2 text-slate-400">
          (Map integration coming soon)
        </p>
      </div>
    </div>
  );
}
