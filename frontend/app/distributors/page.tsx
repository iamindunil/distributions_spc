// app/distributors/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { apiService } from "@/lib/api";
import { Distributor } from "@/lib/types";
import DistributorTable from "@/components/distributors/DistributorTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function DistributorsPage() {
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDistributors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getDistributors();
      setDistributors(data || []);
    } catch (err: unknown) {
      console.error("Failed to load distributors:", err);
      const message = err instanceof Error ? err.message : "Failed to load distributors";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDistributors();
  }, [loadDistributors]);

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-slate-50 min-h-screen">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-[600px] w-full rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center space-y-6">
        <p className="text-red-600 text-lg">{error}</p>
        <Button onClick={loadDistributors} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Distributors Management
        </h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={loadDistributors}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <DistributorTable distributors={distributors} refresh={loadDistributors} />
    </div>
  );
}