"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Vehicle } from "@/lib/types";
import { api } from "@/lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
  vehicle?: Vehicle | null;
}

export default function VehicleForm({
  open,
  onClose,
  refresh,
  vehicle,
}: Props) {
  const [driver, setDriver] = useState(vehicle?.driver ?? "");
  const [route, setRoute] = useState(vehicle?.route ?? "");
  const [status, setStatus] = useState(vehicle?.status ?? "");
  const [capacity, setCapacity] = useState(vehicle?.capacity ?? 0);

  const handleSubmit = async () => {
    const payload = { driver, route, status, capacity };

    if (vehicle) {
      await api.updateVehicle(vehicle.id, payload);
    } else {
      await api.addVehicle(payload);
    }

    refresh();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose} key={vehicle?.id ?? "new"}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-orange-500">
            {vehicle ? "Edit Vehicle" : "Add Vehicle"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Driver"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
          />
          <Input
            placeholder="Route"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          />
          <Input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />

          <Button className="bg-orange-500 w-full" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
