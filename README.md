🍽️ DineEase – Chef Dashboard (Frontend)

A modern, responsive Chef Dashboard built with React + Vite + TailwindCSS for the DineEase project.
This app provides chefs a real-time interface to manage orders, track inventory, and sync with the backend (Spring Boot).

⸻

🚀 Features
	•	🔑 Authentication
	•	Demo login with localStorage (ready to plug into /api/v1/auth/chef/login).
	•	Logout clears session & returns to login screen.
	•	📊 Chef Dashboard
	•	Stats overview cards (Active Orders, Pending, Completed, Out of Stock).
	•	Kanban board (New → Preparing → Ready → Reopen).
	•	📋 Menu Catalog
	•	Category filters, in-stock / out-of-stock badges.
	•	🏷️ Inventory
	•	Status badges (Adequate, Low, OOS) with notify actions.
	•	📱 Responsive Layout
	•	Collapsible sidebar (desktop).
	•	Hamburger drawer (tablet/mobile).
	•	⚡ Error Handling
	•	ErrorBoundary prevents blank white screens on runtime errors.
	•	“Clear storage & reload” option if localStorage is corrupted.

⸻

🛠️ Tech Stack
	•	Frontend Framework: React 18 + Vite
	•	Styling: Tailwind CSS
	•	Icons: lucide-react
	•	State/Storage: LocalStorage wrappers (auth.js, prefs.js)
	•	Routing: react-router-dom v6

⸻

📂 Project Structure

src/
  components/     # Layout, ErrorBoundary, OrderBoard, etc.
  pages/          # Home, Dashboard, Menu, Inventory, Login
  store/          # auth.js, prefs.js (localStorage-backed)
  App.jsx         # Routes
  main.jsx        # App bootstrap


⸻

🔧 Getting Started

1. Clone & Install

git clone https://github.com/your-org/dineease-chef-dashboard.git
cd dineease-chef-dashboard
npm install

2. Run Dev Server

npm run dev

Open http://localhost:5173

3. Build for Production

npm run build
npm run preview


⸻

🔑 Auth Integration

Right now login uses a localStorage stub.
To connect with the backend team’s Spring Boot API:
	•	src/pages/Login.jsx: replace the stub with a call to:

POST /api/v1/auth/chef/login

and save the returned token + chef into auth.js.
	•	src/store/auth.js: already has setToken, setChef, clear helpers.

⸻

🧹 .gitignore

We ignore common junk and secrets:

node_modules/
dist/
.env
.env.local
.env.*.local
.vscode/*
!.vscode/extensions.json
.idea/
.DS_Store
*.log


⸻

👥 Contributing
	•	Frontend team: focus on components, styling, UX polish.
	•	Backend team: connect APIs for auth, orders, menu, inventory.
	•	PRs welcome — please use feature branches.

⸻

📌 Notes
	•	If you see a blank screen → check DevTools console.
	•	If storage is corrupted, use the ErrorBoundary’s “Clear storage & reload” button.
	•	Default demo login accepts any email/password.

⸻

© 2025 DineEase Project
