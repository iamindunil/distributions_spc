// lib/api.ts
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Employee, Vehicle, DashboardStats } from "@/lib/types";

// Use environment variable with fallback (for dev/prod)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds
});

// Optional: Add auth token interceptor (uncomment when you have authentication)
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Example: const token = localStorage.getItem("token");
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

// Global response error handler
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
      message = "No response from server – check your internet connection";
    } else {
      message = error.message || "Unknown error";
    }

    // Optional: toast notification (uncomment when toast is set up)
    // import { toast } from "@/components/ui/use-toast";
    // toast?.({
    //   variant: "destructive",
    //   title: "Error",
    //   description: message,
    // });

    console.error("[API Error]", { message, error });

    return Promise.reject(error);
  }
);

// Service object with typed methods
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

  // Add more endpoints as needed (e.g. reports, auth, notifications)
};

// Also export as default (allows both import styles)
export default apiService;