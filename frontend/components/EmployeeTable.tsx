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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { toast } from "@/components/ui/use-toast"; // optional

interface EmployeeTableProps {
  employees: Employee[];
  refresh: () => Promise<void>;
}

export default function EmployeeTable({ employees, refresh }: EmployeeTableProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      await apiService.deleteEmployee(id);
      // toast?.({ title: "Deleted", description: "Employee removed" });
      await refresh();
    } catch (err) {
      console.error(err);
      // toast?.({ variant: "destructive", title: "Error", description: "Delete failed" });
      alert("Failed to delete employee");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-orange-600">Employees</h2>
        <Button
          className="rounded-xl bg-orange-500 hover:bg-orange-600 gap-2"
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
              <TableHead className="px-6 py-4">Name</TableHead>
              <TableHead className="px-6 py-4">Email</TableHead>
              <TableHead className="px-6 py-4">Role</TableHead>
              <TableHead className="px-6 py-4">Status</TableHead>
              <TableHead className="px-6 py-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id} className="hover:bg-orange-50/30 transition-colors">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${emp.email}`} alt={emp.name} />
                      <AvatarFallback>{emp.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{emp.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-slate-600">{emp.email}</TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {emp.role}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelected(emp);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:bg-red-50"
                        onClick={() => handleDelete(emp.id)}
                      >
                        Delete
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