"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LayoutGrid, List, MapPin, Calendar, Clock, Eye, X, Loader2 } from "lucide-react";
import { getUserBookings, cancelBooking } from "@/action/server/bookingDetails";

function Badge({ className, children, ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

function Button({ className, variant = "default", size = "default", asChild = false, children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer select-none";

  const variants = {
    default: "bg-primary text-primary-foreground hover:opacity-90 shadow-soft",
    outline: "border border-border bg-background text-foreground hover:bg-muted",
    ghost: "hover:bg-muted text-foreground",
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-sm rounded-full",
    sm: "h-8 px-3 text-xs rounded-full",
    lg: "h-11 px-8 text-sm rounded-full",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${combinedClassName} ${children.props.className || ""}`,
      ...props
    });
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}

const badgeStyles = {
  Pending: "bg-warning/15 text-warning border-warning/30",
  Confirmed: "bg-primary/15 text-primary border-primary/30",
  Completed: "bg-success/15 text-success border-success/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

const delayClasses = [
  "delay-100",
  "delay-200",
  "delay-300",
  "delay-400",
  "delay-500",
  "delay-600",
  "delay-700",
];

export default function MyBookings() {
  const { data: session, status } = useSession();
  const [view, setView] = useState("cards");
  const [items, setItems] = useState(null);

  useEffect(() => {
    document.title = "My bookings — Care Center";
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      meta.content = "noindex";
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      getUserBookings(session.user.id).then(setItems);
    }
  }, [status, session]);

  const handleCancel = async (id) => {
    if (confirm(`Are you sure you want to cancel this booking?`)) {
      await cancelBooking(id, session?.user?.id);
      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: "Cancelled" } : item
        )
      );
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center animate-fade-in">
        <div className="mx-auto mb-6 grid h-32 w-32 place-items-center rounded-full gradient-hero text-6xl shadow-soft">
          🔒
        </div>
        <h1 className="text-2xl font-bold text-foreground">Sign in to view bookings</h1>
        <p className="mt-2 text-muted-foreground">
          Please sign in to see your booking history.
        </p>
        <Button asChild className="mt-6">
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    );
  }

  if (items === null) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center animate-fade-in">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading your bookings...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center animate-fade-in">
        <div className="mx-auto mb-6 grid h-32 w-32 place-items-center rounded-full gradient-hero text-6xl shadow-soft">
          📭
        </div>
        <h1 className="text-2xl font-bold text-foreground">No bookings yet</h1>
        <p className="mt-2 text-muted-foreground">
          When you book a caregiver, your bookings will appear here.
        </p>
        <Button asChild className="mt-6">
          <Link href="/services">Find a caregiver</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My bookings</h1>
          <p className="text-muted-foreground mt-1">
            Manage, review, and rebook your caregivers.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border bg-card p-1 shadow-soft">
          <button
            onClick={() => setView("cards")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${
              view === "cards"
                ? "gradient-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-4 w-4" /> Cards
          </button>
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${
              view === "table"
                ? "gradient-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="h-4 w-4" /> Table
          </button>
        </div>
      </div>

      {view === "cards" ? (
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((b, i) => (
            <div
              key={b._id}
              className={`animate-fade-up ${
                delayClasses[i % delayClasses.length]
              } rounded-3xl border bg-card p-6 shadow-card hover:shadow-glow transition-all duration-300`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">{b._id?.slice(-6)?.toUpperCase()}</p>
                  <h3 className="font-bold text-lg mt-0.5 text-foreground">{b.serviceTitle}</h3>
                </div>
                <Badge className={badgeStyles[b.status]}>
                  {b.status}
                </Badge>
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" /> {new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" /> {b.hours} hrs{b.unit === "days" ? ` · ${b.qty} days` : ""}
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" /> {b.area ? `${b.area}, ` : ""}{b.city}
                </li>
              </ul>
              <div className="mt-5 pt-5 border-t flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-bold text-lg gradient-text">${b.total?.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Eye className="h-3.5 w-3.5" /> Details
                  </Button>
                  {(b.status === "Pending" || b.status === "Confirmed") && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCancel(b._id)}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-1"
                    >
                      <X className="h-3.5 w-3.5" /> Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border bg-card shadow-card overflow-hidden animate-scale-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left border-b border-border">
                <tr>
                  {["Booking", "Service", "Date", "Duration", "Location", "Total", "Status", ""].map((h) => (
                    <th key={h} className="px-6 py-4 font-semibold text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((b) => (
                  <tr key={b._id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{b._id?.slice(-6)?.toUpperCase()}</td>
                    <td className="px-6 py-4 text-foreground font-semibold">{b.serviceTitle}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{b.hours} hrs{b.unit === "days" ? ` · ${b.qty} days` : ""}</td>
                    <td className="px-6 py-4 text-muted-foreground">{b.area ? `${b.area}, ` : ""}{b.city}</td>
                    <td className="px-6 py-4 font-semibold text-foreground">${b.total?.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <Badge className={badgeStyles[b.status]}>
                        {b.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          Details
                        </Button>
                        {(b.status === "Pending" || b.status === "Confirmed") && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCancel(b._id)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
