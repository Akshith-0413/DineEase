
import { useEffect, useState } from "react";
import { api, menu as seed } from "../../api/mock";
import MenuCard from "./MenuCard.jsx";

const categories = ["All Items", ...Array.from(new Set(seed.map(m => m.category)))];

export default function MenuCatalog() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("All Items");

  async function load() {
    const data = await api.getMenu();
    setItems(data);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = items.filter(m => (active === "All Items" ? true : m.category === active));

  return (
    <div className="bg-white rounded-xl p-4 shadow-card mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">Menu Catalog</h3>
        <button
          className="px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary hover:text-white"
          onClick={async () => {
            const item = prompt("Which item is out of stock?");
            if (item) {
              const res = await api.reportOOS(item);
              alert(res.message);
            }
          }}
        >
          Report Out of Stock
        </button>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto py-3">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 rounded-full border whitespace-nowrap ${
              active === c ? "bg-primary text-white border-primary" : "bg-white border-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(m => (
          <MenuCard key={m.id} item={m} />
        ))}
      </div>
    </div>
  );
}