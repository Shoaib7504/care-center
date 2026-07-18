"use client";

const COLORS = {
  Pending: "#F59E0B",
  Confirmed: "#3B82F6",
  Completed: "#10B981",
  Cancelled: "#EF4444",
};

const STATUS_ORDER = ["Confirmed", "Pending", "Completed", "Cancelled"];
const STATUS_LABELS = {
  Confirmed: "Confirmed",
  Pending: "Pending",
  Completed: "Completed",
  Cancelled: "Cancelled",
};

export default function DonutChart({ data = {} }) {
  const total = Object.values(data).reduce((s, v) => s + v, 0) || 0;
  if (total === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">No data</p>
      </div>
    );
  }

  const segments = STATUS_ORDER.reduce((acc, key) => {
    if (!data[key]) return acc;
    const pct = data[key] / total;
    const prevPct = acc.reduce((s, x) => s + x.pct, 0);
    const offset = prevPct * 360;
    const len = pct * 360;
    acc.push({ key, pct, offset, len, color: COLORS[key] });
    return acc;
  }, []);

  const circumference = 2 * Math.PI * 45;
  const dashSum = segments.reduce((s, seg) => s + (seg.pct * circumference), 0);
  const gapSum = segments.length * 2;
  const scale = dashSum > 0 ? (circumference - gapSum) / dashSum : 1;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-center">
      <div className="relative h-36 w-36 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          {segments.map((seg, i) => {
            const dashLen = seg.pct * circumference * scale;
            const dashGap = 2;
            const dashOffset = segments
              .slice(0, i)
              .reduce((s, x) => s + x.pct * circumference * scale + (i > 0 ? 0 : 0), 0)
              + i * dashGap;
            return (
              <circle
                key={seg.key}
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={seg.color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                strokeDashoffset={-dashOffset}
                className="transition-all duration-700"
              />
            );
          })}
          <circle cx="50" cy="50" r="32" fill="var(--color-card)" className="transition-colors" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-foreground">{total}</p>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Total</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 sm:flex-col">
        {STATUS_ORDER.map((key) => {
          if (!data[key]) return null;
          const pct = ((data[key] / total) * 100).toFixed(0);
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[key] }} />
              <span className="text-xs font-medium text-muted-foreground">{STATUS_LABELS[key]}</span>
              <span className="text-xs font-semibold text-foreground">{data[key]}</span>
              <span className="text-[10px] text-muted-foreground">({pct}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
