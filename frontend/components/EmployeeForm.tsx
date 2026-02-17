// components/EmployeeForm.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Employee } from "@/lib/types";
import { apiService } from "@/lib/api";
// import { toast } from "@/components/ui/use-toast"; // Uncomment when toast is installed

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  refresh: () => Promise<void>;
  employee?: Employee | null;
}

export default function EmployeeForm({
  open,
  onClose,
  refresh,
  employee,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync form data when dialog opens or employee changes
  useEffect(() => {
    if (!open) return; // Only run when dialog is open

    if (employee) {
      setFormData({
        name: employee.name?.trim() ?? "",
        email: employee.email?.trim() ?? "",
        role: employee.role ?? "",
      });
    } else {
      setFormData({ name: "", email: "", role: "" });
    }
  }, [open, employee]);

  const handleChange = (field: keyof typeof formData) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName || !trimmedEmail || !formData.role) {
      alert("Please fill all required fields");
      // toast?.({ variant: "destructive", title: "Error", description: "All fields required" });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: trimmedName,
        email: trimmedEmail,
        role: formData.role,
      };

      if (employee?.id) {
        await apiService.updateEmployee(employee.id, payload);
        // toast?.({ title: "Success", description: "Employee updated" });
      } else {
        await apiService.addEmployee(payload);
        // toast?.({ title: "Success", description: "Employee added" });
      }

      await refresh();
      onClose();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save employee. Please try again.");
      // toast?.({ variant: "destructive", title: "Error", description: "Failed to save" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl shadow-2xl border-0">
        <DialogHeader className="pt-6 pb-2 px-6 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-orange-600">
            {employee ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">
              Full Name *
            </Label>
            <Input
              id="name"
              placeholder="e.g. Alex Johnson"
              value={formData.name}
              onChange={handleChange("name")}
              className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. alex.j@spc.com"
              value={formData.email}
              onChange={handleChange("email")}
              className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-slate-700">
              Role *
            </Label>
            <Select
              value={formData.role}
              onValueChange={(val) => setFormData((p) => ({ ...p, role: val }))}
              disabled={isSubmitting}
            >
              <SelectTrigger className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Logistics Staff">Logistics Staff</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 pt-4 border-t border-slate-100 gap-3">
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
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white min-w-[120px]"
          >
            {isSubmitting ? "Saving..." : "Save Employee"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}