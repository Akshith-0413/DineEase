
import StatsBar from "../components/StatsBar.jsx";
import OrderBoard from "../components/board/OrderBoard.jsx";

export default function Dashboard() {
  return (
    <>
      <StatsBar />
      <div className="bg-white rounded-xl p-4 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">Order Management</h3>
          <button
            className="px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary hover:text-white"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
        <OrderBoard />
      </div>
    </>
  );
}