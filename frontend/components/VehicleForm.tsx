// components/VehicleForm.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Vehicle } from "@/lib/types";
import { apiService } from "@/lib/api";
import { Select } from "@radix-ui/react-select";
interface VehicleFormProps {
  open: boolean;
  onClose: () => void;
  refresh: () => Promise<void>;
  vehicle?: Vehicle | null;
}

export default function VehicleForm({
  open,
  onClose,
  refresh,
  vehicle,
}: VehicleFormProps) {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    driver: "",
    route: "",
    status: "Idle",
    capacity: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (vehicle) {
      setFormData({
        vehicleNumber: vehicle.vehicleNumber || "",
        driver: vehicle.driver || "",
        route: vehicle.route || "",
        status: vehicle.status || "Idle",
        capacity: vehicle.capacity || 0,
      });
    } else {
      setFormData({
        vehicleNumber: "",
        driver: "",
        route: "",
        status: "Idle",
        capacity: 0,
      });
    }
  }, [open, vehicle]);

  const handleChange = (field: keyof typeof formData) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = field === "capacity" ? Number(e.target.value) : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async () => {
    if (!formData.vehicleNumber || !formData.driver || !formData.route) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { ...formData };

      if (vehicle?.id) {
        await apiService.updateVehicle(vehicle.id, payload);
      } else {
        await apiService.addVehicle(payload);
      }

      await refresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save vehicle");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-2xl shadow-2xl border-0">
        <DialogHeader className="pt-6 pb-2 px-6 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-orange-600">
            {vehicle ? "Edit Vehicle" : "Add New Vehicle"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="vehicleNumber">Vehicle Number / Plate *</Label>
              <Input
                id="vehicleNumber"
                placeholder="e.g. WP CA-1234"
                value={formData.vehicleNumber}
                onChange={handleChange("vehicleNumber")}
                disabled={isSubmitting}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="driver">Assigned Driver *</Label>
              <Input
                id="driver"
                placeholder="e.g. Mr. Ruwan Perera"
                value={formData.driver}
                onChange={handleChange("driver")}
                disabled={isSubmitting}
                className="h-11 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="route">Assigned Route *</Label>
              <Input
                id="route"
                placeholder="e.g. Colombo – Kandy – Nuwara Eliya"
                value={formData.route}
                onChange={handleChange("route")}
                disabled={isSubmitting}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Load Capacity (%)</Label>
              <Input
                id="capacity"
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 75"
                value={formData.capacity}
                onChange={handleChange("capacity")}
                disabled={isSubmitting}
                className="h-11 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Current Status</Label>
            <Select
              value={formData.status}
              onValueChange={(val) => setFormData((p) => ({ ...p, status: val }))}
              disabled={isSubmitting}
            >
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Idle">Idle</SelectItem>
                <SelectItem value="Loading">Loading</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 pt-4 border-t border-slate-100 gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white min-w-[140px]"
          >
            {isSubmitting ? "Saving..." : "Save Vehicle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}