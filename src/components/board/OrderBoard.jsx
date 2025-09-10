import { useEffect, useState } from "react";
import OrderColumn from "./OrderColumn.jsx";
import { ordersStore } from "../../store/orders";

export default function OrderBoard() {
  const [orders, setOrders] = useState([]);
  const [tick, setTick] = useState(0);            // ← NEW

  async function refresh() {
    await ordersStore.refresh();
    setOrders([...ordersStore.orders]);
  }

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 5000);         // polling for data
    const clock = setInterval(() => setTick(t => t + 1), 30000); // ← NEW: visual clock
    return () => { clearInterval(t); clearInterval(clock); };
  }, []);

  const pending = orders.filter(o => o.status === "pending");
  const preparing = orders.filter(o => o.status === "preparing");
  const ready = orders.filter(o => o.status === "ready");

  const handleDropTo = async (columnTitle, id, fromStatus) => {
    if (columnTitle === "Preparing") {
      if (fromStatus === "pending") await ordersStore.accept(id);
      else if (fromStatus === "ready") await ordersStore.reopen(id);
    } else if (columnTitle === "Ready to Serve") {
      await ordersStore.ready(id);
    }
    setOrders([...ordersStore.orders]);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3 mt-2">
      <OrderColumn
        title="New Orders"
        count={pending.length}
        orders={pending}
        action="accept"
        onAction={async (id) => { await ordersStore.accept(id); setOrders([...ordersStore.orders]); }}
        onDropTo={(id, fromStatus) => handleDropTo("New Orders", id, fromStatus)}
        tick={tick}                               // ← NEW
      />
      <OrderColumn
        title="Preparing"
        count={preparing.length}
        orders={preparing}
        action="mark-ready"
        onAction={async (id) => { await ordersStore.ready(id); setOrders([...ordersStore.orders]); }}
        onDropTo={(id, fromStatus) => handleDropTo("Preparing", id, fromStatus)}
        tick={tick}                               // ← NEW
      />
      <OrderColumn
        title="Ready to Serve"
        count={ready.length}
        orders={ready}
        action="reopen"
        onAction={async (id) => { await ordersStore.reopen(id); setOrders([...ordersStore.orders]); }}
        onDropTo={(id, fromStatus) => handleDropTo("Ready to Serve", id, fromStatus)}
        tick={tick}                               // ← NEW
      />
    </div>
  );
}