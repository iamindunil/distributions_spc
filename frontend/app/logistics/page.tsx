// app/logistics/page.tsx (updated to integrate real data and sections)
"use client";

import { useEffect, useState, useCallback } from "react";
import { apiService } from "@/lib/api";
import { RefreshCw, Truck, Route as RouteIcon, PackageCheck, Clock, AlertTriangle } from "lucide-react";
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

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsData, routesData, deliveriesData] = await Promise.all([
        apiService.getLogisticsStats(),
        apiService.getRoutes(),
        apiService.getDeliveries()
      ]);

      setStats(statsData);
      setRoutes(routesData);
      setDeliveries(deliveriesData);
    } catch (err) {
      console.error("Failed to load logistics data:", err);
      setError("Failed to load logistics overview. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Optional: auto-refresh every 60 seconds
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [loadData]);

  const handleRefresh = () => loadData();

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-slate-50 min-h-screen">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-2xl" />
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
            Manage fleet movement, routes, deliveries, and live distribution tracking
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
              <RouteIcon className="h-4 w-4 text-orange-500" />
              Total Routes
            </CardTitle>  