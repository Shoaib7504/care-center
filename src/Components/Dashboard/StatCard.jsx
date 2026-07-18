"use client";

export default function StatCard({ icon: Icon, label, value, sub, gradient, trend }) {
  return (
    <div className="animate-fade-up rounded-2xl border bg-card p-5 shadow-card hover:shadow-glow transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-1.5 text-3xl font-bold text-foreground">{value}</p>
          {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
          {trend && (
            <p className={`mt-1 text-xs font-medium ${trend.startsWith("+") ? "text-success" : "text-destructive"}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${gradient} text-white shadow-soft shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
