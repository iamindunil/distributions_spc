"use client";
import Link from "next/link";


export default function Sidebar() {
return (
<div className="w-64 min-h-screen bg-orange-500 text-white p-5">
<h1 className="text-2xl font-bold mb-10">Distribution</h1>
<nav className="flex flex-col gap-4">
<Link href="/">Dashboard</Link>
<Link href="/employees">Employees</Link>
<Link href="/vehicles">Vehicles</Link>
</nav>
</div>
);
}