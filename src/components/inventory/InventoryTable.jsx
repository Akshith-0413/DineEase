
import { useEffect, useState } from "react";
import { api } from "../../api/mock";

const badgeClass = (status) => {
  if (status === "Adequate") return "bg-green-50 text-green-700";
  if (status === "Low") return "bg-yellow-50 text-yellow-700";
  return "bg-red-50 text-red-600"; // Out of Stock
};

export default function InventoryTable() {
  const [rows, setRows] = useState([]);

  async function load() {
    const data = await api.getInventory();
    setRows(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-card mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-primary">Inventory Status</h3>
        <button className="px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary hover:text-white">
          Request Items
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th className="py-2">Ingredient</th>
              <th className="py-2">Category</th>
              <th className="py-2">Current Stock</th>
              <th className="py-2">Status</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="py-2">{r.ingredient}</td>
                <td className="py-2">{r.category}</td>
                <td className="py-2">{r.currentStock}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full ${badgeClass(r.status)}`}>
                    {r.status}
                  </span>
                </td>
                <td className="py-2">
                  <button
                    className="px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => alert(`Notified admin about ${r.ingredient}`)}
                  >
                    Notify
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No inventory data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}