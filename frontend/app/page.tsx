// app/page.tsx  (or wherever your dashboard lives)
"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Users, Truck, Package, AlertTriangle } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data – replace with real API later
const mockStats = {
  totalUsers: 1240,
  activeFleets: 56,
  pendingOrders: 12,
  alerts: 3,
};

export default function DashboardPage() {
  const [stats, setStats] = useState<typeof mockStats | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
    }, 800);
  }, []);

  if (!stats) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-orange-600">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="h-36 animate-pulse bg-gray-100" />
            ))}
        </div>
        <Card className="h-80 animate-pulse bg-gray-100" />
      </div>
    );
  }

  const chartData = [
    { name: "Users", value: stats.totalUsers, fill: "#f97316" },
    { name: "Fleets", value: stats.activeFleets, fill: "#10b981" },
    { name: "Orders", value: stats.pendingOrders, fill: "#3b82f6" },
    { name: "Alerts", value: stats.alerts, fill: "#ef4444" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 lg:space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
        Dashboard Overview
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          color="orange"
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          title="Active Fleets"
          value={stats.activeFleets}
          icon={Truck}
          color="green"
          trend="neutral"
          trendValue="+2"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={Package}
          color="blue"
          trend="down"
          trendValue="-15%"
        />
        <StatCard
          title="Active Alerts"
          value={stats.alerts}
          icon={AlertTriangle}
          color="red"
          trend="up"
          trendValue="+1"
        />
      </div>

      {/* Chart Card */}
      <Card className="shadow-sm border-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Key Metrics Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
                <XAxis dataKey="name" axisLine={false} tick={{ fill: "#64748b" }} />
                <YAxis axisLine={false} tick={{ fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}