// components/dashboard/QuickActions.tsx
import { Button } from "@/components/ui/button";
import { Plus, Truck, UserPlus, FileText } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild variant="outline" className="gap-2 border-orange-200 hover:bg-orange-50">
        <Link href="/vehicles">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Link>
      </Button>

      <Button asChild variant="outline" className="gap-2 border-orange-200 hover:bg-orange-50">
        <Link href="/employees">
          <UserPlus className="h-4 w-4" />
          Add Employee
        </Link>
      </Button>

      <Button variant="outline" className="gap-2 border-orange-200 hover:bg-orange-50">
        <FileText className="h-4 w-4" />
        Generate Report
      </Button>
    </div>
  );
}