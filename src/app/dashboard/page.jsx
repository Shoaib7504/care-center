"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Users,
  CalendarCheck,
  Clock,
  DollarSign,
  RefreshCw,
  Loader2,
  TrendingUp,
  Calendar,
  MapPin,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import StatCard from "@/Components/Dashboard/StatCard";
import DonutChart from "@/Components/Dashboard/DonutChart";
import BarChart from "@/Components/Dashboard/BarChart";
import { adminGetAllUsers, adminGetAllBookings } from "@/action/server/admin";

const statusColors = {
  Pending: "bg-warning/15 text-warning border-warning/30",
  Confirmed: "bg-primary/15 text-primary border-primary/30",
  Completed: "bg-success/15 text-success border-success/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

function Badge({ className, children }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}

export default function DashboardOverview() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    Promise.all([adminGetAllUsers(), adminGetAllBookings()])
      .then(([u, b]) => { setUsers(u); setBookings(b); })
      .catch(() => toast.error("Failed to load dashboard data"))
      .finally(() => setLoading(false));
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchData(); }, [fetchData]);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total || 0), 0);
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "Confirmed").length;
  const completedBookings = bookings.filter((b) => b.status === "Completed").length;
  const cancelledBookings = bookings.filter((b) => b.status === "Cancelled").length;

  const statusDistribution = {
    Pending: pendingBookings,
    Confirmed: confirmedBookings,
    Completed: completedBookings,
    Cancelled: cancelledBookings,
  };

  const revenueByMonth = {};
  bookings.forEach((b) => {
    if (!b.createdAt) return;
    const d = new Date(b.createdAt);
    const key = d.toLocaleString("en-US", { month: "short", year: "numeric" });
    revenueByMonth[key] = (revenueByMonth[key] || 0) + (b.total || 0);
  });
  const revenueChartData = Object.entries(revenueByMonth)
    .map(([label, value]) => ({ label, value }))
    .slice(-6);

  const recentBookings = [...bookings].slice(0, 5);
  const recentUsers = [...users].slice(0, 5);

  const isAdmin = session?.user?.role === "admin";

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center animate-fade-in">
        <div className="mx-auto mb-6 grid h-28 w-28 place-items-center rounded-full bg-destructive/10 text-5xl shadow-soft">
          <ShieldAlert className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
        <p className="mt-2 text-muted-foreground">
          You need admin privileges to access the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 animate-fade-in">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary shadow-soft">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {session?.user?.name || "Admin"}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-50 transition-colors cursor-pointer"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Loading dashboard data...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={Users}
              label="Total Users"
              value={users.length}
              gradient="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <StatCard
              icon={CalendarCheck}
              label="Total Bookings"
              value={bookings.length}
              gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
            />
            <StatCard
              icon={Clock}
              label="Pending"
              value={pendingBookings}
              sub={bookings.length > 0 ? `${((pendingBookings / bookings.length) * 100).toFixed(0)}% of all` : "0% of all"}
              gradient="bg-gradient-to-br from-amber-500 to-amber-600"
            />
            <StatCard
              icon={DollarSign}
              label="Revenue"
              value={`$${totalRevenue.toLocaleString()}`}
              sub={`From ${bookings.length} booking${bookings.length !== 1 ? "s" : ""}`}
              gradient="bg-gradient-to-br from-violet-500 to-violet-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <h2 className="text-base font-bold text-foreground mb-1">Booking Status</h2>
              <p className="text-xs text-muted-foreground mb-5">Distribution of all booking statuses</p>
              <DonutChart data={statusDistribution} />
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <h2 className="text-base font-bold text-foreground mb-1">Revenue Overview</h2>
              <p className="text-xs text-muted-foreground mb-5">Monthly revenue from bookings</p>
              <BarChart data={revenueChartData} height={160} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-foreground">Recent Bookings</h2>
                <Link
                  href="/dashboard/bookings"
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              {recentBookings.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No bookings yet</p>
              ) : (
                <div className="space-y-3">
                  {recentBookings.map((b) => (
                    <div
                      key={b._id}
                      className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3 transition-colors hover:bg-muted/40"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {b.serviceTitle || "Unknown Service"}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {b.createdAt
                              ? new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                              : "—"}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {b.city || "—"}
                          </span>
                          <span className="font-medium text-foreground">${b.total?.toFixed(2) || "0.00"}</span>
                        </div>
                      </div>
                      <Badge className={statusColors[b.status] || statusColors.Pending}>
                        {b.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-foreground">Recent Users</h2>
                <Link
                  href="/dashboard/users"
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              {recentUsers.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No users yet</p>
              ) : (
                <div className="space-y-3">
                  {recentUsers.map((u) => (
                    <div
                      key={u._id}
                      className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-3 transition-colors hover:bg-muted/40"
                    >
                      <div className="h-9 w-9 shrink-0 rounded-full overflow-hidden ring-2 ring-primary/10">
                        <img
                          src={u.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                          alt={u.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {u.name || "N/A"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                          u.role === "admin"
                            ? "bg-primary/15 text-primary border-primary/30"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {u.role}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
