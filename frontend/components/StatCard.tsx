// components/dashboard/StatCard.tsx
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "orange" | "green" | "blue" | "red";
};

const colorMap = {
  orange: "text-orange-600 bg-orange-50",
  green: "text-green-600 bg-green-50",
  blue: "text-blue-600 bg-blue-50",
  red: "text-red-600 bg-red-50",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend = "neutral",
  trendValue,
  color = "orange",
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-200",
        "border-none shadow-sm"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>

          <div
            className={cn(
              "h-14 w-14 rounded-2xl flex items-center justify-center",
              colorMap[color]
            )}
          >
            <Icon className="h-7 w-7" />
          </div>
        </div>

        {trendValue && (
          <div className="mt-4 flex items-center gap-1 text-xs">
            {trend === "up" && <span className="text-green-600">↑</span>}
            {trend === "down" && <span className="text-red-600">↓</span>}
            <span
              className={cn(
                trend === "up" && "text-green-600",
                trend === "down" && "text-red-600",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              {trendValue} this month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}