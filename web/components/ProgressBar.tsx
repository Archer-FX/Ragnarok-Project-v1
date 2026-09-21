const COLORES: Record<string, { bar: string; text: string }> = {
  cyan: { bar: "bg-neon-cyan shadow-neon-cyan", text: "text-neon-cyan" },
  magenta: { bar: "bg-neon-magenta shadow-neon-magenta", text: "text-neon-magenta" },
  green: { bar: "bg-neon-green shadow-neon-green", text: "text-neon-green" },
  amber: { bar: "bg-neon-amber", text: "text-neon-amber" },
};

export default function ProgressBar({
  label,
  value,
  assignee,
  color = "cyan",
}: {
  label: string;
  value: number;
  assignee?: string | null;
  color?: "cyan" | "magenta" | "green" | "amber";
}) {
  const c = COLORES[color];
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-16 shrink-0 font-semibold text-slate-300">{label}</span>
      <div className="flex-1 progress-track">
        <div
          className={`progress-fill ${c.bar}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      <span className={`w-32 shrink-0 text-right ${c.text}`}>
        {value}% {assignee ? `· @${assignee}` : "· Por asignar"}
      </span>
    </div>
  );
}
