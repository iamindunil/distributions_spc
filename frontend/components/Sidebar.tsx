"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const linkStyle = (href: string) =>
    `block px-4 py-2 rounded-lg ${
      path === href ? "bg-white text-orange-500 font-semibold" : "hover:bg-orange-400"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-orange-500 text-white p-5 hidden md:block">
      <h2 className="text-2xl font-bold mb-10">Distribution</h2>
      <nav className="space-y-3">
        <Link href="/" className={linkStyle("/")}>
          Dashboard
        </Link>
        <Link href="/employees" className={linkStyle("/employees")}>
          Employees
        </Link>
        <Link href="/vehicles" className={linkStyle("/vehicles")}>
          Vehicles
        </Link>
      </nav>
    </aside>
  );
}
