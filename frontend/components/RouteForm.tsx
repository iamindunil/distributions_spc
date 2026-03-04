// components/RouteForm.tsx (new)
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Route } from "@/lib/types";
import { apiService } from "@/lib/api";

interface RouteFormProps {
  open: boolean;
  onClose: () => void;
  refresh: () => Promise<void>;
  route?: Route | null;
}

export default function RouteForm({
  open,
  onClose,
  refresh,
  route,
}: RouteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    startLocation: "",
    endLocation: "",
    distanceKm: 0,
    estimatedHours: 0,
    status: "Active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (route) {
      setFormData({
        name: route.name || "",
        startLocation: route.startLocation || "",
        endLocation: route.endLocation || "",
        distanceKm: route.distanceKm || 0,
        estimatedHours: route.estimatedHours || 0,
        status: route.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        startLocation: "",
        endLocation: "",
        distanceKm: 0,
        estimatedHours: 0,
        status: "Active",
      });
    }
  }, [open, route]);

  const handleChange = (field: keyof typeof formData) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === "distanceKm" || field === "estimatedHours" 
        ? Number(e.target.value) || 0 
        : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async () => {
    if (!formData.name || !formData.startLocation || !formData.endLocation) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { ...formData };

      if (route?.id) {
        await apiService.updateRoute(route.id, payload);
      } else {
        await apiService.addRoute(payload);
      }

      await refresh();
      onClose();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save route");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-2xl shadow-2xl border-0">
        <DialogHeader className="pt-6 pb-2 px-6 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-orange-600">
            {route ? "Edit Route" : "Add New Route"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="name">Route Name *</Label>
            <Input
              id="name"
              placeholder="e.g. Colombo - Kandy Express"
              value={formData.name}
              onChange={handleChange("name")}
              disabled={isSubmitting}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startLocation">Start Location *</Label>
              <Input
                id="startLocation"
                placeholder="e.g. Colombo"
                value={formData.startLocation}
                onChange={handleChange("startLocation")}
                disabled={isSubmitting}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endLocation">End Location *</Label>
              <Input
                id="endLocation"
                placeholder="e.g. Kandy"
                value={formData.endLocation}
                onChange={handleChange("endLocation")}
                disabled={isSubmitting}
                className="h-11 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="distanceKm">Distance (km)</Label>
              <Input
                id="distanceKm"
                type="number"
                placeholder="e.g. 120"
                value={formData.distanceKm}
                onChange={handleChange("distanceKm")}
                disabled={isSubmitting}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedHours">Estimated Time (hours)</Label>
              <Input
                id="estimatedHours"
                type="number"
                placeholder="e.g. 3"
                value={formData.estimatedHours}
                onChange={handleChange("estimatedHours")}
                disabled={isSubmitting}
                className="h-11 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(val) => setFormData((p) => ({ ...p, status: val }))}
              disabled={isSubmitting}
            >
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
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
            className="rounded-xl bg-orange-500 hover:bg-orange-600 min-w-[120px]"
          >
            {isSubmitting ? "Saving..." : "Save Route"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}