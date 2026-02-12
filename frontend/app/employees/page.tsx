"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Employee {
  id: number;
  name: string;
  email: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    api.getEmployees().then(setEmployees);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-4">
        Employees
      </h1>

      <div className="bg-white rounded-xl shadow p-4">
        {employees.map((emp) => (
          <div key={emp.id} className="border-b py-2">
            <p className="font-semibold">{emp.name}</p>
            <p className="text-gray-500 text-sm">{emp.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
