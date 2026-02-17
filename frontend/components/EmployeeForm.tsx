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
// import { toast } from "@/components/ui/use-toast"; // Uncomment if installed

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
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

  // Sync form when employee or open changes
  useEffect(() => {
    if (open) {
      if (employee) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData({
          name: employee.name || "",
          email: employee.email || "",
          role: employee.role || "",
        });
      } else {
        setFormData({ name: "", email: "", role: "" });
      }
    }
  }, [employee, open]);

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.role) {
      // toast?.({ variant: "destructive", title: "Error", description: "All fields required" });
      alert("Please fill all fields");
      return;
    }

    try {
      if (employee) {
        await apiService.updateEmployee(employee.id, formData);
        // toast?.({ title: "Success", description: "Employee updated" });
      } else {
        await apiService.addEmployee(formData);
        // toast?.({ title: "Success", description: "Employee added" });
      }
      refresh();
      onClose();
    } catch (error) {
      console.error(error);
      // toast?.({ variant: "destructive", title: "Error", description: "Failed to save" });
      alert("Failed to save employee");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl shadow-xl border-0">
        <DialogHeader className="pt-6 pb-2 px-6 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-orange-600">
            {employee ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="e.g. Alex Johnson"
              value={formData.name}
              onChange={handleChange("name")}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. alex.j@spc.com"
              value={formData.email}
              onChange={handleChange("email")}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(val) => setFormData((p) => ({ ...p, role: val }))}>
              <SelectTrigger className="h-11 rounded-xl">
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
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="rounded-xl bg-orange-500 hover:bg-orange-600">
            Save Employee
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}