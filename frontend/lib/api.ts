// lib/api.ts
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Employee, Vehicle, DashboardStats, Route, Delivery, LogisticsStats, Distributor } from "@/lib/types";

// Base URL from environment or fallback to localhost
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds timeout
});

// Request interceptor – automatically adds JWT token if present
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response error handler – detailed logging and user-friendly messages
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    let message = "An unexpected error occurred";

    if (error.response) {
      const status = error.response.status;
      if (status === 400) message = "Invalid request data";
      else if (status === 401) message = "Unauthorized – please log in";
      else if (status === 403) message = "Forbidden – insufficient permissions";
      else if (status === 404) message = "Resource not found";
      else if (status >= 500) message = "Server error – please try again later";
      else message = error.message || "Request failed";
    } else if (error.request) {
      message = "No response from server – check your connection or backend status";
    } else {
      message = error.message || "Unknown error";
    }

    // Optional: toast notification (uncomment when you add shadcn toast)
    // import { toast } from "@/components/ui/use-toast";
    // toast?.({ variant: "destructive", title: "Error", description: message });

    console.error("[API Error]", { message, error, status: error.response?.status });
    return Promise.reject(error);
  }
);

// API service methods (all typed responses)
export const apiService = {
  // ──────────────────────────────────────────────
  // Authentication
  // ──────────────────────────────────────────────
  login: async (email: string, password: string): Promise<{ token: string; role: string; email: string }> => {
    const res = await api.post<{ token: string; role: string; email: string }>("/auth/login", {
      email,
      password,
    });
    return res.data;
  },

  registerDistributor: async (data: {
    email: string;
    password: string;
    businessName: string;
    ownerName?: string;
    address?: string;
    phone?: string;
    registrationNumber?: string;
  }): Promise<{ message: string }> => {
    const res = await api.post<{ message: string }>("/auth/register", data);
    return res.data;
  },

  // ──────────────────────────────────────────────
  // Employees
  // ──────────────────────────────────────────────
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

  // ──────────────────────────────────────────────
  // Vehicles
  // ──────────────────────────────────────────────
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

  // ──────────────────────────────────────────────
  // Dashboard
  // ──────────────────────────────────────────────
  getDashboardStats: async (): Promise<DashboardStats> => {
    const res = await api.get<DashboardStats>("/dashboard/stats");
    return res.data;
  },

  // ──────────────────────────────────────────────
  // Routes
  // ──────────────────────────────────────────────
  getRoutes: async (): Promise<Route[]> => {
    const res = await api.get<Route[]>("/routes");
    return res.data;
  },

  addRoute: async (data: Omit<Route, "id">): Promise<Route> => {
    const res = await api.post<Route>("/routes", data);
    return res.data;
  },

  updateRoute: async (id: number, data: Omit<Route, "id">): Promise<Route> => {
    const res = await api.put<Route>(`/routes/${id}`, data);
    return res.data;
  },

  deleteRoute: async (id: number): Promise<void> => {
    await api.delete(`/routes/${id}`);
  },

  // ──────────────────────────────────────────────
  // Deliveries
  // ──────────────────────────────────────────────
  getDeliveries: async (): Promise<Delivery[]> => {
    const res = await api.get<Delivery[]>("/deliveries");
    return res.data;
  },

  addDelivery: async (data: Omit<Delivery, "id">): Promise<Delivery> => {
    const res = await api.post<Delivery>("/deliveries", data);
    return res.data;
  },

  updateDelivery: async (id: number, data: Omit<Delivery, "id">): Promise<Delivery> => {
    const res = await api.put<Delivery>(`/deliveries/${id}`, data);
    return res.data;
  },

  deleteDelivery: async (id: number): Promise<void> => {
    await api.delete(`/deliveries/${id}`);
  },

  // ──────────────────────────────────────────────
  // Distributors (Admin only)
  // ──────────────────────────────────────────────
  getDistributors: async (): Promise<Distributor[]> => {
    const res = await api.get<Distributor[]>("/distributors");
    return res.data;
  },

  addDistributor: async (data: Omit<Distributor, "id">): Promise<Distributor> => {
    const res = await api.post<Distributor>("/distributors", data);
    return res.data;
  },

  updateDistributor: async (id: number, data: Omit<Distributor, "id">): Promise<Distributor> => {
    const res = await api.put<Distributor>(`/distributors/${id}`, data);
    return res.data;
  },

  approveDistributor: async (id: number): Promise<void> => {
    await api.put(`/distributors/${id}/approve`);
  },

  rejectDistributor: async (id: number): Promise<void> => {
    await api.put(`/distributors/${id}/reject`);
  },

  deleteDistributor: async (id: number): Promise<void> => {
    await api.delete(`/distributors/${id}`);
  },

  // ──────────────────────────────────────────────
  // Logistics Stats
  // ──────────────────────────────────────────────
  getLogisticsStats: async (): Promise<LogisticsStats> => {
    const res = await api.get<LogisticsStats>("/vehicles/logistics/stats");
    return res.data;
  },

  // Add more endpoints later (reports, notifications, etc.)
};

// Export default (allows import api from "@/lib/api")
export default apiService;