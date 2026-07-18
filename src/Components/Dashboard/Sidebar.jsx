"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 grid h-10 w-10 place-items-center rounded-xl border bg-card shadow-soft lg:hidden cursor-pointer"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2.5 ${collapsed ? "justify-center w-full" : ""}`}
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-primary text-white shadow-soft">
              <HeartPulse className="h-5 w-5" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold text-foreground tracking-tight">CaringHands</span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted transition-colors lg:hidden cursor-pointer"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  collapsed ? "justify-center" : ""
                } ${
                  isActive
                    ? "gradient-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border px-3 py-3 space-y-1">
          <button
            onClick={() => {
              signOut();
              toast.success("Signed out");
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all cursor-pointer ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>

          <button
            onClick={() => setCollapsed((p) => !p)}
            className="hidden lg:flex w-full items-center justify-center rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all cursor-pointer"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}
