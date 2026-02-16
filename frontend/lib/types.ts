export interface Employee {
id: number
name: string
email: string
role: string
}


export interface Vehicle {
id: number
driver: string
route: string
status: string
capacity: number
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