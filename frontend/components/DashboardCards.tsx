import { Card } from "@/components/ui/card";


export default function DashboardCards() {
return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<Card className="p-6">Total Employees</Card>
<Card className="p-6">Active Fleets</Card>
<Card className="p-6">Alerts</Card>
</div>
);
}