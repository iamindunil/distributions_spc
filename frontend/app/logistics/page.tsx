// app/logistics/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { apiService } from "@/lib/api";
import { RefreshCw, Truck, Route as RouteIcon, PackageCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RouteTable from "@/components/RouteTable";
import DeliveryTable from "@/components/DeliveryTable";
import { LogisticsStats, Route, Delivery } from "@/lib/types";

export default function LogisticsPage() {
  const [stats, setStats] = useState<LogisticsStats | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsData, routesData, deliveriesData] = await Promise.all([
        apiService.getLogisticsStats(),
        apiService.getRoutes(),
        apiService.getDeliveries(),
      ]);

      setStats(statsData);
      setRoutes(routesData || []);
      setDeliveries(deliveriesData || []);
    } catch (err: unknown) {
  console.error("Failed to load logistics data:", err);

  let errorMessage = "Failed to load logistics overview. Please try again.";

  if (err instanceof Error) {
    errorMessage = err.message;
  } else if (typeof err === "string") {
    errorMessage = err;
  } else if (err && typeof err === "object" && "message" in err) {
    errorMessage = String(err.message);
  }

  setError(errorMessage);
} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();

    // Auto-refresh every 60 seconds (optional)
    const interval = setInterval(loadAllData, 60000);
    return () => clearInterval(interval);
  }, [loadAllData]);

  const handleRefresh = () => loadAllData();

  // Loading state
  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-[600px] w-full rounded-2xl" />
      </div>
    );
  }

  // Error state
  if (error || !stats) {
    return (
      <div className="p-8 text-center space-y-6 bg-slate-50 min-h-screen flex flex-col items-center justify-center">
        <AlertTriangle className="h-16 w-16 text-red-500" />
        <h2 className="text-2xl font-bold text-slate-800">Something went wrong</h2>
        <p className="text-slate-600 max-w-md">{error || "Failed to load logistics data"}</p>
        <Button onClick={handleRefresh} size="lg" variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
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
            Manage fleet movement, routes, deliveries, and live distribution tracking
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-slate-500">
            Last updated: {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6">
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700">
              <Truck className="h-5 w-5 text-blue-600" />
              Total Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats.totalVehicles}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700">
              <Truck className="h-5 w-5 text-orange-600" />
              Active Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">{stats.activeVehicles}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700">
              <RouteIcon className="h-5 w-5 text-purple-600" />
              Total Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{stats.totalRoutes}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700">
              <PackageCheck className="h-5 w-5 text-green-600" />
              On-Time Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{stats.onTimeDeliveries}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300">
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

      {/* Tabs: Routes & Deliveries */}
      <Tabs defaultValue="routes" className="space-y-6">
        <TabsList className="bg-white border rounded-xl p-1">
          <TabsTrigger value="routes" className="rounded-lg data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700">
            Routes
          </TabsTrigger>
          <TabsTrigger value="deliveries" className="rounded-lg data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700">
            Deliveries
          </TabsTrigger>
        </TabsList>

        <TabsContent value="routes">
          <RouteTable routes={routes} refresh={loadAllData} />
        </TabsContent>

        <TabsContent value="deliveries">
          <DeliveryTable deliveries={deliveries} refresh={loadAllData} />
        </TabsContent>
      </Tabs>

      {/* Live Tracking Placeholder */}
      <Card className="border-none shadow-sm bg-white rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <Truck className="h-6 w-6 text-orange-600" />
            Live Fleet Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12 text-slate-500">
          <Truck className="h-16 w-16 mx-auto mb-6 text-orange-300 opacity-70" />
          <h3 className="text-lg font-medium mb-2">Real-time Vehicle Locations</h3>
          <p className="text-sm max-w-md mx-auto">
            Map with live vehicle positions, route progress, and delivery status will appear here once map integration is added.
          </p>
          <p className="text-xs mt-4 text-slate-400">
            (Google Maps / Leaflet integration coming soon)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}