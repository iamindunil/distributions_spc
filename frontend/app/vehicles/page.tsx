// app/vehicles/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import VehicleTable from "@/components/VehicleTable";
import { apiService } from "@/lib/api";
import { Vehicle } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVehicles = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiService.getVehicles();
      console.log("Fetched vehicles:", data); // debug
      setVehicles(data || []);
    } catch (err) {
      console.error("Failed to load vehicles:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-slate-50 min-h-screen">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[500px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Vehicle Management
        </h1>
      </div>

      <VehicleTable vehicles={vehicles} refresh={loadVehicles} />
    </div>
  );
}