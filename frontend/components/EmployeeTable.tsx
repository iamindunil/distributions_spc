"use client";

import { useEffect, useState } from "react";
import { Employee } from "@/lib/types";
import { api } from "@/lib/api";
import EmployeeForm from "./EmployeeForm";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);

  const load = async () => {
    const data = await api.getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    await api.deleteEmployee(id);
    load();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-orange-500">Employees</h2>
        <Button
          className="bg-orange-500"
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          Add Employee
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.email}</TableCell>
              <TableCell>{e.role}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelected(e);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(e.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EmployeeForm
        open={open}
        onClose={() => setOpen(false)}
        refresh={load}
        employee={selected}
      />
    </div>
  );
}
