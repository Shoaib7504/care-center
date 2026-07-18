"use client";

export default function BarChart({ data = [], height = 180, barColor = "var(--color-primary)" }) {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">No data</p>
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.value), 1);
  const barW = Math.max(12, Math.min(40, 320 / data.length));

  return (
    <div className="flex items-end justify-between gap-1.5" style={{ height }}>
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 24);
        return (
          <div key={i} className="group relative flex flex-1 flex-col items-center justify-end h-full">
            <span className="mb-1 text-[10px] font-semibold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              {d.value}
            </span>
            <div
              className="w-full rounded-t-md transition-all duration-500 cursor-pointer hover:opacity-80"
              style={{
                height: Math.max(4, h),
                backgroundColor: barColor,
                maxWidth: barW,
              }}
            />
            <span className="mt-1.5 text-[9px] text-muted-foreground truncate w-full text-center">
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
