"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Users,
  Search,
  MoreHorizontal,
  Trash2,
  UserCheck,
  ShieldCheck,
  Loader2,
  RefreshCw,
  Mail,
  Phone,
  ShieldAlert,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  adminGetAllUsers,
  adminUpdateUserRole,
  adminDeleteUser,
} from "@/action/server/admin";

const roleColors = {
  admin: "bg-primary/15 text-primary border-primary/30",
  user: "bg-muted text-muted-foreground border-border",
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

export default function DashboardUsers() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    adminGetAllUsers()
      .then((u) => setUsers(u))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const adminCount = users.filter((u) => u.role === "admin").length;

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
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/15 text-blue-500 shadow-soft">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Users</h1>
              <p className="text-sm text-muted-foreground">
                {users.length} total{adminCount > 0 ? ` · ${adminCount} admin${adminCount > 1 ? "s" : ""}` : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
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
            <p className="mt-3 text-sm text-muted-foreground">Loading users...</p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border bg-card shadow-card overflow-hidden animate-scale-in">
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
                                  fetchData();
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
                                  fetchData();
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
                                fetchData();
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
              <p className="mt-3 text-muted-foreground">
                {search ? "No users match your search" : "No users yet"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
