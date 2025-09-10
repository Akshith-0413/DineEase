import OrderCard from "./OrderCard.jsx";

export default function OrderColumn({
  title, count, orders, action, onAction, onDropTo, tick // ← NEW
}) {
  return (
    <div
      className="bg-white rounded-xl p-4 shadow-card"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData("text/order-id");
        const fromStatus = e.dataTransfer.getData("text/from-status");
        if (id) onDropTo?.(id, fromStatus);
      }}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b">
        <span className="font-semibold">{title}</span>
        <span className="w-6 h-6 text-xs grid place-items-center rounded-full bg-primary text-white">{count}</span>
      </div>

      <div>
        {orders.map(o => (
          <OrderCard
            key={o.id}
            o={o}
            action={action}
            onAction={onAction}
            onDragStart={(e, id, fromStatus) => {
              e.dataTransfer.setData("text/order-id", id);
              e.dataTransfer.setData("text/from-status", fromStatus);
            }}
            tick={tick} // ← NEW
          />
        ))}
      </div>
    </div>
  );
}