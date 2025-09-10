function minsFrom(iso) {
  const now = Date.now();
  const then = new Date(iso).getTime();
  return Math.max(0, Math.round((now - then) / 60000));
}

export default function OrderCard({ o, action, onAction, onDragStart, tick }) {
  // `tick` is unused in math but forces re-render every 30s
  void tick;

  const elapsed = minsFrom(o.createdAt);
  const budget = Math.max(...o.items.map(i => i.preparationTime || 0), 0); // minutes
  const remaining = Math.max(0, budget - elapsed);
  const overdue = budget > 0 && elapsed > budget;
  const urgent = remaining <= 3 || o.urgent || overdue;

  const btnClasses = {
    accept: "bg-primary text-white border-primary hover:bg-[#1B5E20]",
    "mark-ready": "bg-secondary text-white border-secondary hover:bg-[#EF6C00]",
    reopen: "bg-transparent text-primary border-primary hover:bg-primary hover:text-white"
  };

  const label =
    action === "accept" ? "Accept" :
    action === "mark-ready" ? "Mark Ready" : "Reopen";

  // Progress (0..100+). If no budget, hide bar.
  const pct = budget > 0 ? Math.min(120, Math.round((elapsed / budget) * 100)) : 0;
  const barColor =
    pct >= 100 ? "bg-[var(--accent)]" :
    pct >= 80  ? "bg-secondary" :
                 "bg-primary";

  return (
    <div
      className={`bg-[var(--background)] rounded-lg p-3 transition shadow-sm mb-3 ${
        urgent ? "border-l-4 border-[var(--accent)]" : ""
      }`}
      draggable
      onDragStart={(e) => onDragStart?.(e, o.id, o.status)}
      aria-label={`Order ${o.orderNumber} at ${o.tableLabel}`}
    >
      <div className="flex items-center justify-between font-semibold text-primary">
        <span className="flex items-center gap-2">
          {o.tableLabel}
          {overdue && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(239,83,80,0.12)] text-[var(--accent)] border border-[var(--accent)]/30">
              Overdue
            </span>
          )}
        </span>
        <span className={`text-xs font-semibold ${urgent ? "text-[var(--accent)]" : "text-gray-500"}`}>
          {remaining} min
        </span>
      </div>

      <div className="text-xs text-gray-500">
        {new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ({elapsed} min ago)
      </div>

      {/* Progress bar */}
      {budget > 0 && (
        <div className="mt-2 h-1.5 bg-white/60 rounded overflow-hidden" role="progressbar" aria-valuenow={Math.min(pct,100)} aria-valuemin={0} aria-valuemax={100}>
          <div className={`h-full ${barColor} transition-all`} style={{ width: `${Math.min(pct, 100)}%` }} />
        </div>
      )}

      <div className="text-sm text-gray-600 mt-2">
        {o.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
      </div>

      {o.notes && (
        <div className="text-xs italic text-[var(--accent)] bg-[rgba(239,83,80,0.1)] rounded px-2 py-1 mt-2">
          {o.notes}
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <button
          className={`px-3 py-1.5 rounded-md text-sm font-medium border transition ${btnClasses[action]}`}
          onClick={() => onAction(o.id)}
        >
          {label}
        </button>
      </div>
    </div>
  );
}