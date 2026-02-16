// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/",          label: "Dashboard",  icon: "fa-chart-pie"      },
  { href: "/employees", label: "Employees",  icon: "fa-users"          },
  { href: "/vehicles",  label: "Vehicles",   icon: "fa-truck"          },
  { href: "/logistics", label: "Logistics",  icon: "fa-truck-fast"     },
  { href: "/reports",   label: "Reports",    icon: "fa-file-invoice"   },
  { href: "/settings",  label: "Settings",   icon: "fa-gear"           },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden lg:flex lg:flex-col lg:w-72 lg:border-r lg:border-slate-200
        lg:bg-white lg:shadow-sm lg:h-screen lg:shrink-0
        transition-all duration-300
      "
    >
      {/* Logo area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <h1 className="
          text-2xl md:text-3xl font-extrabold
          bg-gradient-to-r from-orange-500 to-orange-400
          bg-clip-text text-transparent tracking-tight
        ">
          SPC
        </h1>
        {/* Optional small tag */}
        <span className="ml-2 text-xs font-medium text-slate-500 hidden xl:inline">
          Distribution
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-x-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-orange-50 to-orange-100/70 text-orange-700 shadow-sm"
                      : "text-slate-600 hover:bg-orange-50/60 hover:text-orange-700 hover:translate-x-1"
                  )}
                >
                  {/* Left active indicator bar */}
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-orange-500 to-orange-400 transition-all",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    )}
                  />

                  <i className={`fa-solid ${item.icon} w-5 text-center text-lg transition-colors ${isActive ? "text-orange-600" : "text-slate-500 group-hover:text-orange-500"}`} />

                  <span className="flex-1">{item.label}</span>

                  {/* Optional subtle chevron on hover (for future submenus) */}
                  {/* {item.hasChildren && <i className="fa-solid fa-chevron-right text-xs opacity-0 group-hover:opacity-70 transition" />} */}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom user profile area – add later */}
      {/* <div className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-3 hover:bg-orange-50/40 p-2 rounded-lg cursor-pointer transition">
          <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-semibold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">Admin User</p>
            <p className="text-xs text-slate-500 truncate">admin@spc.com</p>
          </div>
        </div>
      </div> */}
    </aside>
  );
}