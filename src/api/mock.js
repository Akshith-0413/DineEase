// src/api/mock.js

// --- ORDERS (mock data) ---
let orders = [
  {
    id: "o-1",
    orderNumber: "DE-12345",
    tableLabel: "Table 5",
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 60000).toISOString(),
    items: [
      { id: "i-1", name: "Grilled Salmon", quantity: 2, preparationTime: 15, status: "ordered", notes: "Extra spicy" },
      { id: "i-2", name: "Veg Pasta", quantity: 1, preparationTime: 10, status: "ordered" }
    ],
    notes: "Extra spicy for both salmon",
    urgent: true
  },
  {
    id: "o-2",
    orderNumber: "DE-12346",
    tableLabel: "Table 8",
    status: "pending",
    createdAt: new Date(Date.now() - 1 * 60000).toISOString(),
    items: [
      { id: "i-3", name: "Burger", quantity: 1, preparationTime: 8, status: "ordered" },
      { id: "i-4", name: "Fries", quantity: 1, preparationTime: 5, status: "ordered" },
      { id: "i-5", name: "Coke", quantity: 2, preparationTime: 0, status: "ordered" }
    ]
  },
  {
    id: "o-3",
    orderNumber: "DE-12344",
    tableLabel: "Table 3",
    status: "preparing",
    createdAt: new Date(Date.now() - 7 * 60000).toISOString(),
    items: [
      { id: "i-6", name: "Chicken Curry", quantity: 2, preparationTime: 18, status: "preparing" },
      { id: "i-7", name: "Rice", quantity: 2, preparationTime: 12, status: "preparing" }
    ]
  },
  {
    id: "o-4",
    orderNumber: "DE-12343",
    tableLabel: "Table 2",
    status: "ready",
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
    items: [
      { id: "i-8", name: "Salad", quantity: 1, preparationTime: 4, status: "ready" },
      { id: "i-9", name: "Soup", quantity: 2, preparationTime: 6, status: "ready" }
    ]
  }
];

// --- MENU (mock data) ---
export const menu = [
  {
    id: "m-1",
    name: "Grilled Salmon",
    price: 24.99,
    description: "Atlantic salmon with herbs & lemon butter",
    category: "Main Course",
    inStock: true,
    imageUrl: "https://via.placeholder.com/300x200/FF8F00/FFFFFF?text=Grilled+Salmon"
  },
  {
    id: "m-2",
    name: "Vegetarian Pasta",
    price: 16.99,
    description: "Penne with seasonal vegetables in creamy sauce",
    category: "Main Course",
    inStock: true,
    imageUrl: "https://via.placeholder.com/300x200/2E7D32/FFFFFF?text=Veg+Pasta"
  },
  {
    id: "m-3",
    name: "Chocolate Cake",
    price: 8.99,
    description: "Rich chocolate cake with ganache frosting",
    category: "Desserts",
    inStock: false,
    imageUrl: "https://via.placeholder.com/300x200/EF5350/FFFFFF?text=Chocolate+Cake"
  }
];

// --- INVENTORY (mock data) ---
export const inventory = [
  { id: "inv-1", ingredient: "Salmon Fillet", category: "Seafood",  currentStock: "15 kg", status: "Adequate" },
  { id: "inv-2", ingredient: "Chicken Breast", category: "Poultry", currentStock: "8 kg",  status: "Low" },
  { id: "inv-3", ingredient: "Chocolate",      category: "Bakery",  currentStock: "0 kg",  status: "Out of Stock" },
  { id: "inv-4", ingredient: "Fresh Vegetables", category: "Produce", currentStock: "25 kg", status: "Adequate" }
];

// --- MOCK API (single export) ---
export const api = {
  // Orders
  getOrders: async () => JSON.parse(JSON.stringify(orders)),
  acceptOrder: async (id) => {
    orders = orders.map(o =>
      o.id === id
        ? { ...o, status: "preparing", items: o.items.map(i => ({ ...i, status: i.status === "ordered" ? "preparing" : i.status })) }
        : o
    );
    return true;
  },
  markReady: async (id) => {
    orders = orders.map(o =>
      o.id === id
        ? { ...o, status: "ready", items: o.items.map(i => ({ ...i, status: "ready" })) }
        : o
    );
    return true;
  },
  reopen: async (id) => {
    orders = orders.map(o => (o.id === id ? { ...o, status: "preparing" } : o));
    return true;
  },

  // Menu
  getMenu: async () => JSON.parse(JSON.stringify(menu)),
  reportOOS: async (name) => ({ ok: true, message: `Admin notified: ${name} is out of stock` }),

  // Inventory
  getInventory: async () => JSON.parse(JSON.stringify(inventory)),
};

// --- FAKE REALTIME: add a new pending order every ~25s ---
setInterval(() => {
  const id = Math.random().toString(36).slice(2);
  orders.unshift({
    id,
    orderNumber: `DE-${Math.floor(Math.random() * 90000) + 10000}`,
    tableLabel: `Table ${Math.floor(Math.random() * 8) + 1}`,
    status: "pending",
    createdAt: new Date().toISOString(),
    items: [{ id: `it-${id}`, name: "Pasta", quantity: 1, preparationTime: 10, status: "ordered" }],
    urgent: Math.random() < 0.3
  });
}, 25000);