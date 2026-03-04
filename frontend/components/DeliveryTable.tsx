// components/DeliveryTable.tsx (new)
"use client";

import { useState } from "react";
import { Delivery } from "@/lib/types";
import DeliveryForm from "./DeliveryForm";
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

interface DeliveryTableProps {
  deliveries: Delivery[];
  refresh: () => Promise<void>;
}

export default function DeliveryTable({ deliveries, refresh }: DeliveryTableProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Delivery | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "in transit": return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>;
      case "delivered": return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case "delayed": return <Badge className="bg-red-100 text-red-800">Delayed</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this delivery?")) return;

    setDeletingId(id);
    try {
      await apiService.deleteDelivery(id);
      await refresh();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete delivery");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-orange-600">Deliveries</h2>
        <Button
          className="rounded-xl bg-orange-500 hover:bg-orange-600 gap-2 h-10"
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          + Add Delivery
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Order Number</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Vehicle</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Route</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Planned Date</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Actual Date</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Status</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-500">
                  No deliveries found. Click &quot;Add Delivery&quot; to get started.
                </TableCell>
              </TableRow>
            ) : (
              deliveries.map((delivery) => (
                <TableRow key={delivery.id} className="hover:bg-orange-50/40 transition-colors">
                  <TableCell className="px-6 py-4 font-medium text-slate-900">
                    {delivery.orderNumber || "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    {delivery.vehicle ? delivery.vehicle.driver || delivery.vehicle.id : "Not Assigned"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    {delivery.route ? delivery.route.name || delivery.route.id : "Not Assigned"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    {delivery.plannedDate || "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    {delivery.actualDeliveryDate || "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {getStatusBadge(delivery.status)}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={deletingId === delivery.id}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelected(delivery);
                          setOpen(true);
                        }}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(delivery.id)} className="text-red-600">
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

      <DeliveryForm
        open={open}
        onClose={() => setOpen(false)}
        refresh={refresh}
        delivery={selected}
      />
    </div>
  );
}