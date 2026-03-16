// components/distributors/DistributorTable.tsx
"use client";

import { useState } from "react";
import { Distributor } from "@/lib/types";
import DistributorForm from "./DistributorForm";
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
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DistributorTableProps {
  distributors: Distributor[];
  refresh: () => Promise<void>;
}

export default function DistributorTable({ distributors, refresh }: DistributorTableProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Distributor | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleApprove = async (id: number) => {
    if (!confirm("Approve this distributor?")) return;
    setProcessingId(id);
    try {
      await apiService.approveDistributor(id);
      await refresh();
    } catch (err) {
      console.error("Approve failed:", err);
      alert("Failed to approve distributor");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: number) => {
    if (!confirm("Reject this distributor?")) return;
    setProcessingId(id);
    try {
      await apiService.rejectDistributor(id);
      await refresh();
    } catch (err) {
      console.error("Reject failed:", err);
      alert("Failed to reject distributor");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this distributor? This action cannot be undone.")) return;
    setProcessingId(id);
    try {
      await apiService.deleteDistributor(id);
      await refresh();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete distributor");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-orange-600">Distributors</h2>
        <Button
          className="rounded-xl bg-orange-500 hover:bg-orange-600 gap-2 h-10"
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          + Add Distributor
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Business Name</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Owner</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Email</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Phone</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Registration #</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700">Status</TableHead>
              <TableHead className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {distributors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-500">
                  No distributors found. Click &quot;Add Distributor&quot; to get started.
                </TableCell>
              </TableRow>
            ) : (
              distributors.map((dist) => (
                <TableRow key={dist.id} className="hover:bg-orange-50/40 transition-colors">
                  <TableCell className="px-6 py-4 font-medium text-slate-900">
                    {dist.businessName}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    {dist.ownerName || "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    {dist.email}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    {dist.phone || "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    {dist.registrationNumber || "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {getStatusBadge(dist.status)}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={processingId === dist.id}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => {
                          setSelected(dist);
                          setOpen(true);
                        }}>
                          Edit
                        </DropdownMenuItem>

                        {dist.status === "PENDING" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleApprove(dist.id)}
                              disabled={processingId === dist.id}
                              className="text-green-600"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleReject(dist.id)}
                              disabled={processingId === dist.id}
                              className="text-red-600"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}

                        <DropdownMenuItem
                          onClick={() => handleDelete(dist.id)}
                          disabled={processingId === dist.id}
                          className="text-red-600"
                        >
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

      <DistributorForm
        open={open}
        onClose={() => setOpen(false)}
        refresh={refresh}
        distributor={selected}
      />
    </div>
  );
}