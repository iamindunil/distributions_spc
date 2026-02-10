"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Employee } from "@/lib/types";
import { api } from "@/lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
  employee?: Employee | null;
}

export default function EmployeeForm({ open, onClose, refresh, employee }: Props) {
  const [form, setForm] = useState<Employee>({
    id: 0,
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
  if (employee) {
    setForm(employee);
  }
}, [employee?.id]);

  const handleSubmit = async () => {
    if (employee) {
      await api.updateEmployee(employee.id, form);
    } else {
      await api.addEmployee(form);
    }
    refresh();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-orange-500">
            {employee ? "Edit Employee" : "Add Employee"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />

          <Button className="bg-orange-500 w-full" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
