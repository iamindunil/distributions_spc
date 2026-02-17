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
import { api } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

interface Props {
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
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
      setRole(employee.role);
    } else {
      setName("");
      setEmail("");
      setRole("");
    }
  }, [employee, open]);

  const handleSubmit = async () => {
    if (!name || !email || !role) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all fields.",
      });
      return;
    }

    const payload = { name, email, role };

    try {
      if (employee) {
        await api.updateEmployee(employee.id, payload);
        toast({
          title: "Success",
          description: "Employee updated successfully.",
        });
      } else {
        await api.addEmployee(payload);
        toast({
          title: "Success",
          description: "Employee added successfully.",
        });
      }
      refresh();
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save employee. Please try again.",
      });
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
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. alex.j@spc.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-slate-700">
              Role
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="h-11 rounded-xl border-slate-300 focus:border-orange-500 focus:ring-orange-200">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-0 shadow-lg bg-white">
                <SelectItem value="Logistics Staff">Logistics Staff</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
          >
            Save Employee
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}