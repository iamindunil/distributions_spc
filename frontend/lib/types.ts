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
}