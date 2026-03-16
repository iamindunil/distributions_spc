// components/distributors/DistributorForm.tsx
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Distributor } from "@/lib/types";
import { apiService } from "@/lib/api";

interface DistributorFormProps {
  open: boolean;
  onClose: () => void;
  refresh: () => Promise<void>;
  distributor?: Distributor | null;
}

export default function DistributorForm({
  open,
  onClose,
  refresh,
  distributor,
}: DistributorFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "", // only shown when creating new
    businessName: "",
    ownerName: "",
    address: "",
    phone: "",
    registrationNumber: "",
    status: "PENDING",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isNew = !distributor?.id;

  useEffect(() => {
    if (!open) return;

    if (distributor) {
      // Editing existing distributor (admin mode) – no password field
      setFormData({
        email: distributor.email || "",
        password: "", // not editable
        businessName: distributor.businessName || "",
        ownerName: distributor.ownerName || "",
        address: distributor.address || "",
        phone: distributor.phone || "",
        registrationNumber: distributor.registrationNumber || "",
        status: distributor.status || "PENDING",
      });
    } else {
      // New registration (distributor self-signup)
      setFormData({
        email: "",
        password: "",
        businessName: "",
        ownerName: "",
        address: "",
        phone: "",
        registrationNumber: "",
        status: "PENDING",
      });
    }
  }, [open, distributor]);

  const handleChange = (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.email || !formData.businessName) {
      alert("Email and Business Name are required");
      return;
    }

    if (isNew && !formData.password) {
      alert("Password is required for new registration");
      return;
    }

    setIsSubmitting(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {
        email: formData.email,
        businessName: formData.businessName,
        ownerName: formData.ownerName,
        address: formData.address,
        phone: formData.phone,
        registrationNumber: formData.registrationNumber,
      };

      // Include password only when creating new
      if (isNew) {
        payload.password = formData.password;
      } else {
        // When editing, include status if changed
        payload.status = formData.status;
      }

      if (distributor?.id) {
        // Admin edit
        await apiService.updateDistributor(distributor.id, payload);
      } else {
        // New registration (distributor self-signup)
        await apiService.registerDistributor(payload);
      }

      await refresh();
      onClose();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save distributor. Please check the details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-white rounded-2xl shadow-2xl border-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pt-6 pb-2 px-6 border-b border-slate-100">
          <DialogTitle className="text-2xl font-bold text-orange-600">
            {isNew ? "Register as Distributor" : "Edit Distributor"}
          </DialogTitle>
          {isNew && (
            <p className="text-sm text-slate-500 mt-1">
              Please provide your business details. Your registration will be reviewed by our supply team.
            </p>
          )}
        </DialogHeader>

        <div className="space-y-6 p-6">
          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="e.g. ABC Trading Company"
                  value={formData.businessName}
                  onChange={handleChange("businessName")}
                  disabled={isSubmitting}
                  className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  placeholder="Business / Company Registration #"
                  value={formData.registrationNumber}
                  onChange={handleChange("registrationNumber")}
                  disabled={isSubmitting}
                  className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                placeholder="Full address of your business location"
                value={formData.address}
                onChange={handleChange("address")}
                disabled={isSubmitting}
                className="min-h-[80px] rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner / Contact Person Name</Label>
                <Input
                  id="ownerName"
                  placeholder="e.g. Mr. John Perera"
                  value={formData.ownerName}
                  onChange={handleChange("ownerName")}
                  disabled={isSubmitting}
                  className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="e.g. +94 77 123 4567"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  disabled={isSubmitting}
                  className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200"
                />
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g. contact@yourbusiness.lk"
                  value={formData.email}
                  onChange={handleChange("email")}
                  disabled={isSubmitting || !isNew} // email usually not editable after creation
                  className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200"
                />
              </div>

              {isNew && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange("password")}
                    disabled={isSubmitting}
                    className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Status (visible only when editing as admin) */}
          {!isNew && (
            <div className="space-y-2">
              <Label htmlFor="status">Current Status (Admin only)</Label>
              <Select
                value={formData.status}
                onValueChange={(val) => setFormData((p) => ({ ...p, status: val }))}
                disabled={isSubmitting}
              >
                <SelectTrigger className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="PENDING">Pending Approval</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter className="px-6 pb-6 pt-4 border-t border-slate-100 gap-3 flex-wrap">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white min-w-[140px]"
          >
            {isSubmitting
              ? "Saving..."
              : isNew
              ? "Register Business"
              : "Update Distributor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}