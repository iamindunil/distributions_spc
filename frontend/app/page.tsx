// app/page.tsx  (or app/dashboard/page.tsx)
"use client";

<QuickActions />

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { DashboardStats } from "@/lib/types";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import MetricsBarChart from "@/components/dashboard/MetricsBarChart";
import { Skeleton } from "@/components/ui/skeleton";

// ... import other components ...

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<DashboardStats>("/dashboard/stats"); // adjust endpoint
      setStats(response.data);
    } catch (err: any) {
      console.error("Failed to fetch dashboard stats:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();

    // Optional: auto-refresh every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const handleRefresh = () => {
    fetchStats();
  };

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-red-600">{error}</p>
        <Button onClick={handleRefresh} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (!stats) return null;

  const chartData = [
    { name: "Users",   value: stats.totalUsers,   fill: "#f97316" },
    { name: "Fleets",  value: stats.activeFleets, fill: "#10b981" },
    { name: "Orders",  value: stats.pendingOrders,fill: "#3b82f6" },
    { name: "Alerts",  value: stats.alerts,       fill: "#ef4444" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Header with refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        <StatCard title="Total Users"    value={stats.totalUsers.toLocaleString()}   icon={Users}   color="orange" trend="up"   trendValue="+8% this month" />
        <StatCard title="Active Fleets"  value={stats.activeFleets}                 icon={Truck}   color="green"  trend="neutral" trendValue="+2 this month" />
        <StatCard title="Pending Orders" value={stats.pendingOrders}                icon={Package} color="blue"   trend="down"   trendValue="-15% this month" />
        <StatCard title="Active Alerts"  value={stats.alerts}                       icon={AlertTriangle} color="red" trend="up" trendValue="+1 this month" />
      </div>

      {/* Chart */}
      <MetricsBarChart data={chartData} title="Key Metrics Comparison" height={340} />

      {/* Next features (Quick Actions, Recent Activity, Tabs) can go here */}
    </div>
  );
}