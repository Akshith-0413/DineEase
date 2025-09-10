import { Link } from "react-router-dom";
import chefGif from "../assets/chef.gif";
import {
  Utensils,
  Timer,
  Flame,
  ArrowRight,
  ListOrdered,
  BookOpen,
  ClipboardList,
  LayoutDashboard,
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-[#F5F5F5] p-6 md:p-10 shadow-card">
        {/* floating subtle icons */}
        <div className="pointer-events-none absolute -right-6 -top-6 hidden md:block anim-float opacity-20">
          <Utensils size={120} className="text-primary" />
        </div>
        <div className="pointer-events-none absolute -left-6 bottom-4 hidden md:block anim-float opacity-10">
          <Flame size={120} className="text-secondary" />
        </div>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
          {/* Left: Heading & CTA */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary leading-tight">
              Welcome, Chef!{" "}
              <span className="shimmer">Run your pass with ease.</span>
            </h2>
            <p className="text-gray-600 mt-3">
              Track orders in real-time, prioritize urgent tickets, and keep
              your menu & inventory in sync — all in one clean workspace.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/dashboard"
                className="btn-hover inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white"
              >
                <LayoutDashboard size={18} /> Go to Dashboard{" "}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/orders"
                className="btn-hover inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white"
              >
                <ListOrdered size={18} /> Order Queue
              </Link>
              <Link
                to="/menu"
                className="btn-hover inline-flex items-center gap-2 px-4 py-2 rounded-md border border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                <BookOpen size={18} /> Menu Catalog
              </Link>
              <Link
                to="/inventory"
                className="btn-hover inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
              >
                <ClipboardList size={18} /> Inventory
              </Link>
            </div>

            {/* quick highlights */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm card-hover">
                <Timer size={16} className="text-secondary" /> Timers & Overdue
                alerts
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm card-hover">
                <Flame size={16} className="text-[var(--accent)]" /> Urgent
                ticket highlighting
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm card-hover">
                <Utensils size={16} className="text-primary" /> Stock-aware menu
              </div>
            </div>
          </div>

          {/* Right: Chef animated GIF icon */}
          <div className="grid place-items-center">
            <div className="relative">
              {/* soft radial glow behind the GIF to blend with hero bg */}
              <div
                className="pointer-events-none absolute -inset-6 -z-10 rounded-full blur-2xl opacity-35
                           bg-[radial-gradient(ellipse_at_center,rgba(46,125,50,0.18),rgba(255,143,0,0.10)_35%,transparent_70%)]" />
              <img
                src={chefGif}
                alt="Chef animated icon"
                /* mix-blend + slight opacity help the GIF merge with bg even if it has a light backdrop */
                className="w-72 h-72 object-contain anim-float select-none transition-transform duration-300 hover:scale-105
                           opacity-95 mix-blend-multiply"
                loading="eager"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUICK NAV CARDS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/dashboard"
          className="card-hover bg-white rounded-xl p-4 border flex items-center gap-3"
        >
          <div className="w-10 h-10 grid place-items-center rounded-lg bg-primary/10 text-primary">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <div className="font-semibold">Dashboard</div>
            <div className="text-xs text-gray-500">
              Overview & Kanban board
            </div>
          </div>
        </Link>

        <Link
          to="/orders"
          className="card-hover bg-white rounded-xl p-4 border flex items-center gap-3"
        >
          <div className="w-10 h-10 grid place-items-center rounded-lg bg-secondary/10 text-secondary">
            <ListOrdered size={20} />
          </div>
          <div>
            <div className="font-semibold">Order Queue</div>
            <div className="text-xs text-gray-500">Accept, ready, reopen</div>
          </div>
        </Link>

        <Link
          to="/menu"
          className="card-hover bg-white rounded-xl p-4 border flex items-center gap-3"
        >
          <div className="w-10 h-10 grid place-items-center rounded-lg bg-green-100 text-green-700">
            <BookOpen size={20} />
          </div>
          <div>
            <div className="font-semibold">Menu Catalog</div>
            <div className="text-xs text-gray-500">Stock-aware menu cards</div>
          </div>
        </Link>

        <Link
          to="/inventory"
          className="card-hover bg-white rounded-xl p-4 border flex items-center gap-3"
        >
          <div className="w-10 h-10 grid place-items-center rounded-lg bg-red-100 text-red-600">
            <ClipboardList size={20} />
          </div>
          <div>
            <div className="font-semibold">Inventory</div>
            <div className="text-xs text-gray-500">Low & OOS at a glance</div>
          </div>
        </Link>
      </section>

      {/* TIPS / ANNOUNCEMENTS */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="bg-white rounded-xl p-4 shadow-card">
          <h3 className="font-semibold text-primary">Today’s Tips</h3>
          <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
            <li>
              Focus on cards with{" "}
              <span className="text-[var(--accent)] font-medium">Overdue</span>{" "}
              badges first.
            </li>
            <li>Use drag-and-drop to move tickets between stages.</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card">
          <h3 className="font-semibold text-primary">Shortcuts</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <Link
              className="btn-hover px-3 py-1.5 border rounded-md"
              to="/orders"
            >
              View Orders
            </Link>
            <Link
              className="btn-hover px-3 py-1.5 border rounded-md"
              to="/menu"
            >
              Edit Menu
            </Link>
            <Link
              className="btn-hover px-3 py-1.5 border rounded-md"
              to="/inventory"
            >
              Check Inventory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}