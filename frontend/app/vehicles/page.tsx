"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Vehicle } from "@/lib/types";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getVehicles()
      .then(setVehicles)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading vehicles...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-6">
        Vehicles
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-orange-100">
            <tr>
              <th className="p-3">Driver</th>
              <th className="p-3">Route</th>
              <th className="p-3">Status</th>
              <th className="p-3">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-t">
                <td className="p-3">{vehicle.driver}</td>
                <td className="p-3">{vehicle.route}</td>
                <td className="p-3">{vehicle.status}</td>
                <td className="p-3">{vehicle.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
