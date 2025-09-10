
export default function MenuCard({ item }) {
  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-card relative ${!item.inStock ? "opacity-70" : ""}`}>
      <div
        className="h-40 bg-gray-200 bg-cover bg-center"
        style={{ backgroundImage: `url('${item.imageUrl ?? ""}')` }}
      />
      {!item.inStock && (
        <div className="absolute inset-0 bg-black/60 text-white grid place-items-center font-semibold">
          Out of Stock
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between font-semibold">
          <span>{item.name}</span>
          {/* INR-ish preview for local flair; can switch to $ if you prefer */}
          <span className="text-primary">₹{Math.round(item.price * 85)}</span>
        </div>
        <div className="text-gray-500 text-sm mb-3">{item.description}</div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
          }`}
        >
          {item.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
}