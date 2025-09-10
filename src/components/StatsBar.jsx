
import { ListOrdered, Clock3, CheckCircle2, XCircle } from "lucide-react";

export default function StatsBar() {
  const stats = [
    { icon: ListOrdered, label: "Active Orders", value: 12, color: "text-primary" },
    { icon: Clock3, label: "Pending Preparation", value: 8, color: "text-secondary" },
    { icon: CheckCircle2, label: "Completed Today", value: 15, color: "text-primary" },
    { icon: XCircle, label: "Out of Stock Items", value: 3, color: "text-accent" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-4 shadow-card text-center flex flex-col items-center"
        >
          <s.icon className={`mx-auto ${s.color}`} size={28} />
          <div className="text-3xl font-bold text-primary my-2">{s.value}</div>
          <div className="text-gray-500 text-sm">{s.label}</div>
        </div>
      ))}
    </div>
  );
}