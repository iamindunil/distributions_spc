// components/layout/Header.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Bell } from "lucide-react"; // ← Lucide icons imported

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200",
        "shadow-sm transition-all duration-200"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Left side - Fixed Title */}
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl lg:text-2.5xl font-bold tracking-tight text-slate-800">
            SPC Distribution Channel
          </h1>
        </div>

        {/* Center - Wide Search Bar */}
        <div className="flex-1 max-w-2xl mx-6 lg:mx-12 hidden md:block">
          <div
            className={cn(
              "relative flex items-center transition-all duration-300",
              searchFocused ? "scale-[1.02]" : ""
            )}
          >
            <input
              type="text"
              placeholder="Search employees, vehicles, logistics, reports, settings..."
              className={cn(
                "w-full pl-11 pr-5 py-2.5 text-base rounded-full border border-slate-300 shadow-sm",
                "focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200/60 focus:shadow-md",
                "bg-white transition-all duration-200 placeholder:text-slate-400"
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Search
              className={cn(
                "absolute left-4 h-5 w-5 transition-colors",
                searchFocused ? "text-orange-600" : "text-slate-500"
              )}
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Notifications – now using Lucide Bell, made very visible */}
          <button
            className="relative p-2.5 rounded-full hover:bg-orange-50 transition-all duration-200 group"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6 text-slate-700 group-hover:text-orange-600 transition-colors" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-white">3</span>
            </span>
          </button>

          {/* Notification dropdown (same as before, just for completeness) */}
          {showNotifications && (
            <div
              className="
                absolute top-14 right-4 md:right-8 w-80 sm:w-96 bg-white rounded-xl 
                shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fade-in
              "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-100 font-semibold text-slate-800 flex justify-between items-center">
                <span>Notifications</span>
                <span className="text-xs text-orange-600 cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-slate-100 hover:bg-orange-50/50 transition-colors cursor-pointer">
                  <p className="text-sm font-medium">New vehicle added - VH-2049</p>
                  <p className="text-xs text-slate-500 mt-1">2 minutes ago</p>
                </div>
                {/* ... more items ... */}
              </div>
              <div className="p-3 text-center text-sm text-orange-600 hover:bg-orange-50 cursor-pointer">
                View all notifications
              </div>
            </div>
          )}

          {/* User avatar */}
          <button className="flex items-center gap-3 hover:bg-orange-50/60 p-2 rounded-xl transition-all">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold shadow-md">
              I
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium text-slate-800">Indunil</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>
            <span className="hidden lg:block text-xs text-slate-400">▼</span>
          </button>
        </div>
      </div>
    </header>
  );
}