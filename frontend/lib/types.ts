// lib/types.ts (updated with new interfaces)
export interface Employee {
  id: number;
  fullName: string;
  email: string;
  role: string;
  employeeId?: string;
  active?: boolean;
}

export interface Vehicle {
  id: number;
  vehicleNumber?: string;
  driver: string;
  route: string;
  status: string;
  capacity: number;
}

// NEW: Route interface
export interface Route {
  id: number;
  name: string;
  startLocation: string;
  endLocation: string;
  distanceKm?: number;
  estimatedHours?: number;
  status: string; // Active, Inactive, etc.
}

// NEW: Delivery interface
export interface Delivery {
  id: number;
  orderNumber: string;
  vehicle?: Vehicle;
  route?: Route;
  status: string; // Pending, In Transit, Delivered, Delayed
  plannedDate?: string; // ISO date string
  actualDeliveryDate?: string;
  delayReason?: string;
}

// Updated: LogisticsStats to match backend DTO
export interface LogisticsStats {
  totalVehicles: number;
  activeVehicles: number;
  totalRoutes: number;
  onTimeDeliveries: number;
  delayedDeliveries: number;
}

export interface DashboardStats {
  totalUsers: number;
  activeFleets: number;
  pendingOrders: number;
  alerts: number;
  // add more fields later (e.g. recentActivities: Activity[])
}

export interface Activity {
  id: string;
  type: "vehicle_added" | "order_delayed" | "alert" | "user_created";
  message: string;
  timestamp: string;
  user?: string;
}