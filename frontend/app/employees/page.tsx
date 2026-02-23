// app/employees/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import EmployeeTable from "@/components/EmployeeTable";
import { apiService } from "@/lib/api";
import { Employee } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiService.getEmployees();
      
      // DEBUG: Log the actual data from backend
      console.log("Fetched employees from backend:", data);

      // Check if any have missing fullName (updated to fullName)
      data.forEach((emp, index) => {
        if (!emp.fullName?.trim()) {
          console.warn(`Employee at index ${index} has no fullName:`, emp);
        }
      });

      setEmployees(data || []);
    } catch (err) {
      console.error("Failed to load employees:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[500px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
        Employee Management
      </h1>

      <EmployeeTable employees={employees} refresh={loadEmployees} />
    </div>
  );
}