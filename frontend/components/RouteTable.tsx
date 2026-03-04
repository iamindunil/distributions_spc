// components/RouteTable.tsx (new component)
"use client";

import { useState } from "react";
import { Route } from "@/lib/types";
import RouteForm from "./RouteForm";
import { apiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RouteTableProps {
  routes: Route[];
  refresh: () => Promise<void>;
}

export default function RouteTable({ routes, refresh }: RouteTableProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Route | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this route?")) return;

    setDeletingId(id);
    try {
      await apiService.deleteRoute(id);
      await refresh();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete route");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-orange-600">Routes</h2>
        <Button
          className="rounded-xl bg-orange-500 hover:bg-orange-600 gap-2 h-10"
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          + Add Route
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Route Name</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Start Location</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">End Location</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Distance (km)</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Est. Time (hrs)</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Status</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-500">
                  No routes found. Click &quot;Add Route&quot; to get started.
                </TableCell>
              </TableRow>
            ) : (
              routes.map((route) => (
                <TableRow key={route.id} className="hover:bg-orange-50/40 transition-colors">
                  <TableCell className="px-6 py-4 font-medium text-slate-900">
                    {route.name || "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    {route.startLocation || "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    {route.endLocation || "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    {route.distanceKm || "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    {route.estimatedHours || "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {route.status || "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={deletingId === route.id}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelected(route);
                          setOpen(true);
                        }}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(route.id)} className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <RouteForm
        open={open}
        onClose={() => setOpen(false)}
        refresh={refresh}
        route={selected}
      />
    </div>
  );
}