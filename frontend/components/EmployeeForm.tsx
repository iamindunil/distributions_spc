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
import { Employee } from "@/lib/types";
import { api } from "@/lib/api";

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
  // Initialize directly from prop (React 19 safe)
  const [name, setName] = useState(employee?.name ?? "");
  const [email, setEmail] = useState(employee?.email ?? "");
  const [role, setRole] = useState(employee?.role ?? "");

  const handleSubmit = async () => {
    const payload = { name, email, role };

    if (employee) {
      await api.updateEmployee(employee.id, payload);
    } else {
      await api.addEmployee(payload);
    }

    refresh();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose} key={employee?.id ?? "new"}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-orange-500">
            {employee ? "Edit Employee" : "Add Employee"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <Button className="bg-orange-500 w-full" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
