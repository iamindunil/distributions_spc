"use client";

import { useEffect, useState } from "react";
import { Vehicle } from "@/lib/types";
import { apiService } from "@/lib/api";
import VehicleForm from "./VehicleForm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function VehicleTable() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Vehicle | null>(null);

  const load = async () => {
    const data = await apiService.getVehicles();
    setVehicles(data);
  };

useEffect(() => {
  const fetchVehicles = async () => {
    const data = await apiService.getVehicles();
    setVehicles(data);
  };

  fetchVehicles();
}, []);

    function handleDelete(id: number): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-orange-500">Vehicles</h2>
        <Button
          className="bg-orange-500"
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          Add Vehicle
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Driver</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((v) => (
            <TableRow key={v.id}>
              <TableCell>{v.driver}</TableCell>
              <TableCell>{v.route}</TableCell>
              <TableCell>{v.status}</TableCell>
              <TableCell>{v.capacity}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelected(v);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(v.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <VehicleForm
        open={open}
        onClose={() => setOpen(false)}
        refresh={load}
        vehicle={selected}
      />
    </div>
  );
}
