// lib/api.ts
import axios, { AxiosError, AxiosResponse } from "axios";
import { Employee, Vehicle, DashboardStats } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Optional global error handler
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error("[API Error]", error);
    // Optional toast - comment out if use-toast not installed
    // import { toast } from "@/components/ui/use-toast";
    // toast?.({
    //   variant: "destructive",
    //   title: "Error",
    //   description: error.message || "Request failed",
    // });
    return Promise.reject(error);
  }
);

export const apiService = {
  // Employees
  getEmployees: async (): Promise<Employee[]> => {
    const res = await api.get<Employee[]>("/employees");
    return res.data;
  },

  addEmployee: async (data: Omit<Employee, "id">): Promise<Employee> => {
    const res = await api.post<Employee>("/employees", data);
    return res.data;
  },

  updateEmployee: async (id: number, data: Omit<Employee, "id">): Promise<Employee> => {
    const res = await api.put<Employee>(`/employees/${id}`, data);
    return res.data;
  },

  deleteEmployee: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },

  // Vehicles
  getVehicles: async (): Promise<Vehicle[]> => {
    const res = await api.get<Vehicle[]>("/vehicles");
    return res.data;
  },

  addVehicle: async (data: Omit<Vehicle, "id">): Promise<Vehicle> => {
    const res = await api.post<Vehicle>("/vehicles", data);
    return res.data;
  },

  updateVehicle: async (id: number, data: Omit<Vehicle, "id">): Promise<Vehicle> => {
    const res = await api.put<Vehicle>(`/vehicles/${id}`, data);
    return res.data;
  },

  deleteVehicle: async (id: number): Promise<void> => {
    await api.delete(`/vehicles/${id}`);
  },

  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    const res = await api.get<DashboardStats>("/dashboard/stats");
    return res.data;
  },
};

// Export as default too (so both import styles work)
export default apiService;