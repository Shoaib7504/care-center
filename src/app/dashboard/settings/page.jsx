"use client";

import { useSession } from "next-auth/react";
import { Settings, ShieldAlert, User, Mail, Calendar } from "lucide-react";

export default function DashboardSettings() {
  const { data: session } = useSession();

  if (session?.user?.role !== "admin") {
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
      <div className="flex items-center gap-3 mb-8 animate-fade-in">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-muted text-muted-foreground shadow-soft">
          <Settings className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account settings</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-6 animate-fade-up">
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="text-base font-bold text-foreground mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-primary/10 shrink-0">
                <img
                  src={session?.user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  alt={session?.user?.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <p className="font-semibold text-foreground">{session?.user?.name || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{session?.user?.email || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Role: {session?.user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="text-base font-bold text-foreground mb-2">Dashboard Preferences</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Configure how your dashboard looks and behaves.
          </p>
          <div className="space-y-3">
            {[
              { label: "Email Notifications", desc: "Receive email alerts for new bookings" },
              { label: "Weekly Reports", desc: "Get a weekly summary of platform activity" },
            ].map((item) => (
              <label
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4 cursor-pointer hover:bg-muted/40 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <div className="relative h-6 w-11 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="peer sr-only"
                  />
                  <div className="h-full w-full rounded-full bg-muted-foreground/30 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-soft after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-5" />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
