"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Users,
  CalendarCheck,
  Clock,
  DollarSign,
  Search,
  ChevronDown,
  MoreHorizontal,
  Trash2,
  UserCheck,
  ShieldCheck,
  Loader2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Activity,
  BarChart3,
} from "lucide-react";
import toast from "react-hot-toast";
import AdminRoute from "@/Components/AdminRoute";
import {
  adminGetAllUsers,
  adminGetAllBookings,
  adminUpdateUserRole,
  adminDeleteUser,
  adminUpdateBookingStatus,
  adminDeleteBooking,
} from "@/action/server/admin";

const statusColors = {
  Pending: "bg-warning/15 text-warning border-warning/30",
  Confirmed: "bg-primary/15 text-primary border-primary/30",
  Completed: "bg-success/15 text-success border-success/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

const roleColors = {
  admin: "bg-primary/15 text-primary border-primary/30",
  user: "bg-muted text-muted-foreground border-border",
};

const delayClass = (i) => {
  const classes = ["delay-100", "delay-200", "delay-300", "delay-400", "delay-500", "delay-600"];
  return classes[i % classes.length];
};

function StatCard({ icon: Icon, label, value, sub, gradient }) {
  return (
    <div className="animate-fade-up rounded-2xl border bg-card p-5 shadow-card hover:shadow-glow transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-1.5 text-3xl font-bold text-foreground">{value}</p>
          {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${gradient} text-white shadow-soft`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function Badge({ className, children }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}

function UsersTab({ users, onRefresh }) {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-scale-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>
        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                {["User", "Email", "Phone", "Role", "Joined", ""].map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((u, i) => (
                <tr key={u._id} className={`hover:bg-muted/30 transition-colors ${delayClass(i)}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-full overflow-hidden ring-2 ring-primary/10">
                        <img
                          src={u.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                          alt={u.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{u.name || "N/A"}</p>
                        <p className="text-xs text-muted-foreground">{u.providerId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate max-w-[180px]">{u.email}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      {u.phone || "—"}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge className={roleColors[u.role] || roleColors.user}>
                      {u.role === "admin" ? (
                        <><ShieldCheck className="h-3 w-3 mr-1" /> Admin</>
                      ) : (
                        <><UserCheck className="h-3 w-3 mr-1" /> User</>
                      )}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : "—"}
                  </td>
                  <td className="px-5 py-4 text-right relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === u._id ? null : u._id)}
                      className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                    {openMenu === u._id && (
                      <div className="absolute right-0 top-full mt-1 z-50 w-48 origin-top-right animate-scale-in rounded-xl border bg-card p-1.5 shadow-card">
                        {u.role === "admin" ? (
                          <button
                            onClick={async () => {
                              try {
                                await adminUpdateUserRole(u._id, "user");
                                toast.success(`${u.name} demoted to user`);
                                setOpenMenu(null);
                                onRefresh();
                              } catch {
                                toast.error("Failed to update role");
                              }
                            }}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted transition-colors cursor-pointer"
                          >
                            <UserCheck className="h-4 w-4" /> Demote to User
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              try {
                                await adminUpdateUserRole(u._id, "admin");
                                toast.success(`${u.name} promoted to admin`);
                                setOpenMenu(null);
                                onRefresh();
                              } catch {
                                toast.error("Failed to update role");
                              }
                            }}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted transition-colors cursor-pointer"
                          >
                            <ShieldCheck className="h-4 w-4" /> Promote to Admin
                          </button>
                        )}
                        <div className="h-px bg-border my-1" />
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete user "${u.name}"? This cannot be undone.`)) return;
                            try {
                              await adminDeleteUser(u._id);
                              toast.success(`${u.name} deleted`);
                              setOpenMenu(null);
                              onRefresh();
                            } catch {
                              toast.error("Failed to delete user");
                            }
                          }}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" /> Delete User
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
            <Users className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-muted-foreground">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function BookingsTab({ bookings, onRefresh }) {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = bookings.filter(
    (b) =>
      b.serviceTitle?.toLowerCase().includes(search.toLowerCase()) ||
      b._id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-scale-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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
          onClick={onRefresh}
          className="inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
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
                                onRefresh();
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
                              onRefresh();
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
            <p className="mt-3 text-muted-foreground">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [tab, setTab] = useState("bookings");
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

  return (
    <AdminRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-white shadow-soft">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
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
            Refresh Data
          </button>
        </div>

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

        <div className="mb-6 flex items-center gap-2 rounded-full border bg-card p-1 shadow-soft w-fit animate-fade-in">
          {[
            { id: "bookings", label: "Bookings", icon: CalendarCheck },
            { id: "users", label: "Users", icon: Users },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all cursor-pointer ${
                tab === t.id
                  ? "gradient-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-3 text-sm text-muted-foreground">Loading dashboard data...</p>
            </div>
          </div>
        ) : tab === "users" ? (
          <UsersTab users={users} onRefresh={fetchData} />
        ) : (
          <BookingsTab bookings={bookings} onRefresh={fetchData} />
        )}
      </div>
    </AdminRoute>
  );
}
