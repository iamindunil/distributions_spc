"use client";

import { useEffect, useState } from "react";
import { DashboardStats } from "@/lib/types";
import { api } from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    api.getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <div className="p-6">Loading...</div>;

  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Fleets", value: stats.activeFleets },
    { name: "Orders", value: stats.pendingOrders },
    { name: "Alerts", value: stats.alerts },
  ];

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold text-orange-500">
        Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        {chartData.map((item) => (
          <div key={item.name} className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500">{item.name}</p>
            <p className="text-3xl font-bold text-orange-500">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
