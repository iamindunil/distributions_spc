// lib/api.ts
import axios, { AxiosError, AxiosResponse } from "axios";
import { Employee, Vehicle, DashboardStats } from "@/lib/types";

// Optional: Show toast on errors (if you have shadcn toast)
import { toast } from "@/components/ui/use-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds timeout
});

// Optional: Add auth token when you implement login
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Global error handler (you can customize messages per endpoint if needed)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    let message = "An unexpected error occurred";

    if (error.response) {
      const status = error.response.status;
      if (status === 400) message = "Invalid request data";
      else if (status === 401) message = "Unauthorized – please log in";
      else if (status === 403) message = "You don't have permission";
      else if (status === 404) message = "Resource not found";
      else if (status >= 500) message = "Server error – try again later";
      else message = error.message || "Request failed";
    } else if (error.request) {
      message = "No response from server – check your connection";
    }

    // Show toast notification (optional – comment out if you don't want it)
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
    });

    console.error("[API Error]", error);
    return Promise.reject(error);
  }
);

export const apiService = {
  // ================= EMPLOYEES =================
  getEmployees: async (): Promise<Employee[]> => {
    const res = await api.get<Employee[]>("/employees");
    return res.data;
  },

  addEmployee: async (data: Omit<Employee, "id">): Promise<Employee> => {
    const res = await api.post<Employee>("/employees", data);
    return res.data;
  },

  updateEmployee: async (
    id: number,
    data: Omit<Employee, "id">
  ): Promise<Employee> => {
    const res = await api.put<Employee>(`/employees/${id}`, data);
    return res.data;
  },

  deleteEmployee: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },

  // ================= VEHICLES =================
  getVehicles: async (): Promise<Vehicle[]> => {
    const res = await api.get<Vehicle[]>("/vehicles");
    return res.data;
  },

  addVehicle: async (data: Omit<Vehicle, "id">): Promise<Vehicle> => {
    const res = await api.post<Vehicle>("/vehicles", data);
    return res.data;
  },

  updateVehicle: async (
    id: number,
    data: Omit<Vehicle, "id">
  ): Promise<Vehicle> => {
    const res = await api.put<Vehicle>(`/vehicles/${id}`, data);
    return res.data;
  },

  deleteVehicle: async (id: number): Promise<void> => {
    await api.delete(`/vehicles/${id}`);
  },

  // ================= DASHBOARD =================
  getDashboardStats: async (): Promise<DashboardStats> => {
    const res = await api.get<DashboardStats>("/dashboard/stats");
    return res.data;
  },

  // Add more endpoints later (e.g. reports, logistics, auth, etc.)
};

export default apiService;