"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Employees", path: "/employees" },
  { name: "Vehicles", path: "/vehicles" },
  { name: "Logistics", path: "/logistics" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-md h-screen p-6">
      <h1 className="text-xl font-bold text-orange-500 mb-6">
        Distribution SPC
      </h1>

      <div className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`block p-2 rounded-lg transition ${
              pathname === link.path
                ? "bg-orange-500 text-white"
                : "hover:bg-orange-100"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
