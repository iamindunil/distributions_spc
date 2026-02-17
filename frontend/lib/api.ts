import { Employee, Vehicle } from "@/lib/types";

const BASE = "http://localhost:8080/api";

export const api = {
  // ================= EMPLOYEES =================
  getEmployees: async (): Promise<Employee[]> =>
    fetch(`${BASE}/employees`).then((r) => r.json()),

  addEmployee: async (data: Omit<Employee, "id">) =>
    fetch(`${BASE}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  updateEmployee: async (id: number, data: Omit<Employee, "id">) =>
    fetch(`${BASE}/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  deleteEmployee: async (id: number) =>
    fetch(`${BASE}/employees/${id}`, {
      method: "DELETE",
    }),

    

  // ================= VEHICLES =================
  getVehicles: async (): Promise<Vehicle[]> =>
    fetch(`${BASE}/vehicles`).then((r) => r.json()),

  addVehicle: async (data: Omit<Vehicle, "id">) =>
    fetch(`${BASE}/vehicles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  updateVehicle: async (id: number, data: Omit<Vehicle, "id">) =>
    fetch(`${BASE}/vehicles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  deleteVehicle: async (id: number) =>
    fetch(`${BASE}/vehicles/${id}`, {
      method: "DELETE",
    }),

    // ================= DASHBOARD =================
  getDashboardStats: async () =>
    fetch(`${BASE}/dashboard/stats`).then((r) => r.json()),

};
