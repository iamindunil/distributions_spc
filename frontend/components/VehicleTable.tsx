// components/VehicleTable.tsx
"use client";

import { useState } from "react";
import { Vehicle } from "@/lib/types";
import VehicleForm from "./VehicleForm";
import { apiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VehicleTableProps {
  vehicles: Vehicle[];
  refresh: () => Promise<void>;
}

export default function VehicleTable({ vehicles, refresh }: VehicleTableProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const getDisplayStatus = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("transit")) return { label: "In Transit", color: "bg-blue-100 text-blue-800" };
    if (s.includes("loading")) return { label: "Loading", color: "bg-yellow-100 text-yellow-800" };
    if (s.includes("maintenance")) return { label: "Maintenance", color: "bg-red-100 text-red-800" };
    return { label: "Idle", color: "bg-gray-100 text-gray-800" };
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    setDeletingId(id);
    try {
      await apiService.deleteVehicle(id);
      await refresh();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete vehicle");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-orange-600">Vehicles</h2>
        <Button
          className="rounded-xl bg-orange-500 hover:bg-orange-600 gap-2 h-10"
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          + Add Vehicle
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Vehicle Number / Plate</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Assigned Route</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Current Load (%)</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Status</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {vehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-slate-500">
                  No vehicles found. Click &quot;Add Vehicle&quot; to get started.
                </TableCell>
              </TableRow>
            ) : (
              vehicles.map((vehicle) => {
                const statusInfo = getDisplayStatus(vehicle.status);

                return (
                  <TableRow
                    key={vehicle.id}
                    className="hover:bg-orange-50/40 transition-colors"
                  >
                    <TableCell className="px-6 py-4 font-medium text-slate-900">
                      {vehicle.vehicleNumber || vehicle.id || "—"}
                    </TableCell>

                    <TableCell className="px-6 py-4 text-slate-600">
                      {vehicle.route || "Not Assigned"}
                    </TableCell>

                    <TableCell className="px-6 py-4 text-slate-600">
                      {vehicle.capacity != null ? `${vehicle.capacity}%` : "—"}
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <Badge className={statusInfo.color}>
                        {statusInfo.label}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-orange-100"
                            disabled={deletingId === vehicle.id}
                          >
                            <MoreHorizontal className="h-4 w-4 text-slate-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelected(vehicle);
                              setOpen(true);
                            }}
                            className="cursor-pointer"
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:bg-red-50 cursor-pointer"
                            onClick={() => handleDelete(vehicle.id)}
                            disabled={deletingId === vehicle.id}
                          >
                            {deletingId === vehicle.id ? "Deleting..." : "Delete"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <VehicleForm
        open={open}
        onClose={() => setOpen(false)}
        refresh={refresh}
        vehicle={selected}
      />
    </div>
  );
}