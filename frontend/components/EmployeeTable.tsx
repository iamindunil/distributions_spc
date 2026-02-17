// components/EmployeeTable.tsx
"use client";

import { useState } from "react";
import { Employee } from "@/lib/types";
import EmployeeForm from "./EmployeeForm";
import { apiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmployeeTableProps {
  employees: Employee[];
  refresh: () => Promise<void>;
}

export default function EmployeeTable({ employees, refresh }: EmployeeTableProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Helper to safely display name
  const getDisplayName = (emp: Employee) => {
    const name = emp.name?.trim();
    return name && name.length > 0 ? name : "Not Provided";
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    setDeletingId(id);
    try {
      await apiService.deleteEmployee(id);
      await refresh();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete employee");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-orange-600">Employees</h2>
        <Button
          className="rounded-xl bg-orange-500 hover:bg-orange-600 gap-2 h-10"
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          + Add Employee
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Name</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Email</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Role</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Status</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => (
              <TableRow
                key={emp.id}
                className="hover:bg-orange-50/40 transition-colors"
              >
                {/* Name – no avatar, just text */}
                <TableCell className="px-6 py-4 font-medium text-slate-900">
                  {getDisplayName(emp)}
                </TableCell>

                <TableCell className="px-6 py-4 text-slate-600">
                  {emp.email || "—"}
                </TableCell>

                <TableCell className="px-6 py-4">
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 hover:bg-orange-200"
                  >
                    {emp.role || "Not assigned"}
                  </Badge>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Active
                  </Badge>
                </TableCell>

                <TableCell className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-orange-100"
                        disabled={deletingId === emp.id}
                      >
                        <MoreHorizontal className="h-4 w-4 text-slate-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelected(emp);
                          setOpen(true);
                        }}
                        className="cursor-pointer"
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:bg-red-50 cursor-pointer"
                        onClick={() => handleDelete(emp.id)}
                        disabled={deletingId === emp.id}
                      >
                        {deletingId === emp.id ? "Deleting..." : "Delete"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EmployeeForm
        open={open}
        onClose={() => setOpen(false)}
        refresh={refresh}
        employee={selected}
      />
    </div>
  );
}