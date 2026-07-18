"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CalendarCheck,
  Search,
  MoreHorizontal,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  RefreshCw,
  Calendar,
  MapPin,
  ShieldAlert,
} from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import {
  adminGetAllBookings,
  adminUpdateBookingStatus,
  adminDeleteBooking,
} from "@/action/server/admin";

const statusColors = {
  Pending: "bg-warning/15 text-warning border-warning/30",
  Confirmed: "bg-primary/15 text-primary border-primary/30",
  Completed: "bg-success/15 text-success border-success/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

const delayClass = (i) => {
  const classes = ["delay-100", "delay-200", "delay-300", "delay-400", "delay-500", "delay-600"];
  return classes[i % classes.length];
};

function Badge({ className, children }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}

export default function DashboardBookings() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    adminGetAllBookings()
      .then((b) => setBookings(b))
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = bookings.filter(
    (b) =>
      b.serviceTitle?.toLowerCase().includes(search.toLowerCase()) ||
      b._id?.toLowerCase().includes(search.toLowerCase()) ||
      b.userName?.toLowerCase().includes(search.toLowerCase())
  );

  const pendingCount = bookings.filter((b) => b.status === "Pending").length;

  const isAdmin = session?.user?.role === "admin";
  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center animate-fade-in">
        <div className="mx-auto mb-6 grid h-28 w-28 place-items-center rounded-full bg-destructive/10">
          <ShieldAlert className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
        <p className="mt-2 text-muted-foreground">Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 animate-fade-in">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-500 shadow-soft">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
              <p className="text-sm text-muted-foreground">
                {bookings.length} total{pendingCount > 0 ? ` · ${pendingCount} pending` : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
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
      </div>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Loading bookings...</p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border bg-card shadow-card overflow-hidden animate-scale-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b border-border">
                <tr>
                  {["ID", "Service", "User", "Date", "Location", "Duration", "Total", "Status", ""].map((h) => (
                    <th key={h} className="px-5 py-4 text-left font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((b, i) => (
                  <tr key={b._id} className={`hover:bg-muted/30 transition-colors ${delayClass(i)}`}>
                    <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                      #{b._id?.slice(-8)?.toUpperCase()}
                    </td>
                    <td className="px-5 py-4 font-semibold text-foreground whitespace-nowrap">{b.serviceTitle}</td>
                    <td className="px-5 py-4 text-muted-foreground">{b.userName || b.userId?.slice(-6) || "—"}</td>
                    <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        {b.createdAt
                          ? new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                          : "—"}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        {b.city || "—"}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        {b.hours}h{b.unit === "days" ? ` · ${b.qty}d` : ""}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-foreground">${b.total?.toFixed(2) || "0.00"}</td>
                    <td className="px-5 py-4">
                      <Badge className={statusColors[b.status] || statusColors.Pending}>{b.status}</Badge>
                    </td>
                    <td className="px-5 py-4 text-right relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === b._id ? null : b._id)}
                        className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-muted transition-colors cursor-pointer"
                      >
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                      {openMenu === b._id && (
                        <div className="absolute right-0 top-full mt-1 z-50 w-52 origin-top-right animate-scale-in rounded-xl border bg-card p-1.5 shadow-card">
                          <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Change Status</p>
                          {["Pending", "Confirmed", "Completed", "Cancelled"].map((s) => (
                            <button
                              key={s}
                              disabled={s === b.status}
                              onClick={async () => {
                                try {
                                  await adminUpdateBookingStatus(b._id, s);
                                  toast.success(`Booking ${b._id?.slice(-6)?.toUpperCase()} → ${s}`);
                                  setOpenMenu(null);
                                  fetchData();
                                } catch {
                                  toast.error("Failed to update status");
                                }
                              }}
                              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                                s === b.status
                                  ? "text-muted-foreground/40 cursor-not-allowed"
                                  : "text-foreground/80 hover:bg-muted"
                              }`}
                            >
                              {s === "Confirmed" && <CheckCircle2 className="h-4 w-4 text-primary" />}
                              {s === "Completed" && <CheckCircle2 className="h-4 w-4 text-success" />}
                              {s === "Cancelled" && <XCircle className="h-4 w-4 text-destructive" />}
                              {s === "Pending" && <Clock className="h-4 w-4 text-warning" />}
                              {s}
                            </button>
                          ))}
                          <div className="h-px bg-border my-1" />
                          <button
                            onClick={async () => {
                              if (!confirm(`Delete booking #${b._id?.slice(-6)?.toUpperCase()}?`)) return;
                              try {
                                await adminDeleteBooking(b._id);
                                toast.success("Booking deleted");
                                setOpenMenu(null);
                                fetchData();
                              } catch {
                                toast.error("Failed to delete booking");
                              }
                            }}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" /> Delete Booking
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <CalendarCheck className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-3 text-muted-foreground">
                {search ? "No bookings match your search" : "No bookings yet"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
