// app/employees/page.tsx
"use client";

import { useEffect, useState } from "react";
import EmployeeTable from "@/components/EmployeeTable";
import { api } from "@/lib/api";
import { Employee } from "@/lib/types";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const loadEmployees = async () => {
    const data = await api.getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Employee Management
        </h1>
        {/* Optional: Add search or filters here later */}
      </div>
      <EmployeeTable employees={employees} refresh={loadEmployees} />
    </div>
  );
}