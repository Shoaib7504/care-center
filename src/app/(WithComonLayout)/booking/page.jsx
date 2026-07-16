"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutGrid, List, MapPin, Calendar, Clock, Eye, X } from "lucide-react";

// Inline Badge component to replicate Shadcn Badge behavior using global styles
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

// Inline Button component to replicate Shadcn Button behavior using global styles
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

const sampleBookings = [
  { id: "BK-1042", service: "Elderly Care", date: "May 30, 2026", duration: "4 hrs/day · 14 days", location: "Gulshan, Dhaka", cost: 840, status: "Confirmed" },
  { id: "BK-1039", service: "Babysitting", date: "May 24, 2026", duration: "5 hrs", location: "Banani, Dhaka", cost: 60, status: "Completed" },
  { id: "BK-1035", service: "Home Nursing", date: "May 20, 2026", duration: "8 hrs", location: "Dhanmondi, Dhaka", cost: 176, status: "Pending" },
  { id: "BK-1028", service: "Babysitting", date: "May 12, 2026", duration: "3 hrs", location: "Uttara, Dhaka", cost: 36, status: "Cancelled" },
];

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
  const [view, setView] = useState("cards");
  const [items, setItems] = useState(sampleBookings);

  // Set document title and SEO metadata on mount
  useEffect(() => {
    document.title = "My bookings — Care.xyz";
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      meta.content = "noindex";
      document.head.appendChild(meta);
    }
  }, []);

  const handleCancel = (id) => {
    if (confirm(`Are you sure you want to cancel booking ${id}?`)) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "Cancelled" } : item
        )
      );
    }
  };

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
      {/* Title Header with Fade In */}
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
              key={b.id}
              className={`animate-fade-up ${
                delayClasses[i % delayClasses.length]
              } rounded-3xl border bg-card p-6 shadow-card hover:shadow-glow transition-all duration-300`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">{b.id}</p>
                  <h3 className="font-bold text-lg mt-0.5 text-foreground">{b.service}</h3>
                </div>
                <Badge className={badgeStyles[b.status]}>
                  {b.status}
                </Badge>
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" /> {b.date}
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" /> {b.duration}
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" /> {b.location}
                </li>
              </ul>
              <div className="mt-5 pt-5 border-t flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-bold text-lg gradient-text">${b.cost}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Eye className="h-3.5 w-3.5" /> Details
                  </Button>
                  {(b.status === "Pending" || b.status === "Confirmed") && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCancel(b.id)}
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
                  <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{b.id}</td>
                    <td className="px-6 py-4 text-foreground font-semibold">{b.service}</td>
                    <td className="px-6 py-4 text-muted-foreground">{b.date}</td>
                    <td className="px-6 py-4 text-muted-foreground">{b.duration}</td>
                    <td className="px-6 py-4 text-muted-foreground">{b.location}</td>
                    <td className="px-6 py-4 font-semibold text-foreground">${b.cost}</td>
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
                            onClick={() => handleCancel(b.id)}
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