// components/DeliveryForm.tsx (new)
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
import { Delivery } from "@/lib/types";
import { apiService } from "@/lib/api";

interface DeliveryFormProps {
  open: boolean;
  onClose: () => void;
  refresh: () => Promise<void>;
  delivery?: Delivery | null;
}

export default function DeliveryForm({
  open,
  onClose,
  refresh,
  delivery,
}: DeliveryFormProps) {
  const [formData, setFormData] = useState({
    orderNumber: "",
    vehicleId: "",
    routeId: "",
    status: "Pending",
    plannedDate: "",
    actualDeliveryDate: "",
    delayReason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (delivery) {
      setFormData({
        orderNumber: delivery.orderNumber || "",
        vehicleId: delivery.vehicle?.id?.toString() || "",
        routeId: delivery.route?.id?.toString() || "",
        status: delivery.status || "Pending",
        plannedDate: delivery.plannedDate || "",
        actualDeliveryDate: delivery.actualDeliveryDate || "",
        delayReason: delivery.delayReason || "",
      });
    } else {
      setFormData({
        orderNumber: "",
        vehicleId: "",
        routeId: "",
        status: "Pending",
        plannedDate: "",
        actualDeliveryDate: "",
        delayReason: "",
      });
    }
  }, [open, delivery]);

  const handleChange = (field: keyof typeof formData) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    if (!formData.orderNumber || !formData.vehicleId || !formData.routeId) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        orderNumber: formData.orderNumber,
        vehicleId: Number(formData.vehicleId),
        routeId: Number(formData.routeId),
        status: formData.status,
        plannedDate: formData.plannedDate,
        actualDeliveryDate: formData.actualDeliveryDate,
        delayReason: formData.delayReason,
      };

      if (delivery?.id) {
        await apiService.updateDelivery(delivery.id, payload);
      } else {
        await apiService.addDelivery(payload);
      }

      await refresh();
      onClose();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save delivery");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-2xl shadow-2xl border-0">
        <DialogHeader className="pt-6 pb-2 px-6 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-orange-600">
            {delivery ? "Edit Delivery" : "Add New Delivery"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="orderNumber">Order Number *</Label>
            <Input
              id="orderNumber"
              placeholder="e.g. ORD-001"
              value={formData.orderNumber}
              onChange={handleChange("orderNumber")}
              disabled={isSubmitting}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="vehicleId">Vehicle ID *</Label>
              <Input
                id="vehicleId"
                type="number"
                placeholder="e.g. 1"
                value={formData.vehicleId}
                onChange={handleChange("vehicleId")}
                disabled={isSubmitting}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="routeId">Route ID *</Label>
              <Input
                id="routeId"
                type="number"
                placeholder="e.g. 1"
                value={formData.routeId}
                onChange={handleChange("routeId")}
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Delayed">Delayed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="plannedDate">Planned Date</Label>
              <Input
                id="plannedDate"
                type="datetime-local"
                value={formData.plannedDate}
                onChange={handleChange("plannedDate")}
                disabled={isSubmitting}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualDeliveryDate">Actual Delivery Date</Label>
              <Input
                id="actualDeliveryDate"
                type="datetime-local"
                value={formData.actualDeliveryDate}
                onChange={handleChange("actualDeliveryDate")}
                disabled={isSubmitting}
                className="h-11 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="delayReason">Delay Reason (if delayed)</Label>
            <Input
              id="delayReason"
              placeholder="e.g. Traffic or Weather"
              value={formData.delayReason}
              onChange={handleChange("delayReason")}
              disabled={isSubmitting}
              className="h-11 rounded-xl"
            />
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
            className="rounded-xl bg-orange-500 hover:bg-orange-600 min-w-[140px]"
          >
            {isSubmitting ? "Saving..." : "Save Delivery"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}