import { useEffect, useState, useRef } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ChefHat,
  Home as HomeIcon,
  ListOrdered,
  BookOpen,
  ClipboardList,
  // LogOut,  // no longer in sidebar
  Menu as MenuIcon,
  X as CloseIcon,
  ChevronsLeft,
  ChevronsRight,
  LogOut as LogOutIcon,
} from "lucide-react";
import { auth } from "../store/auth";

const LS_KEY = "dineease.sidebar.collapsed";

export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load persisted collapse state
  useEffect(() => {
    try {
      const v = window.localStorage.getItem(LS_KEY);
      if (v != null) setCollapsed(v === "true");
    } catch (err) {
      console.error("Failed to read sidebar state:", err);
    }
  }, []);

  // Persist collapse state
  useEffect(() => {
    try {
      window.localStorage.setItem(LS_KEY, String(collapsed));
    } catch (err) {
      console.error("Failed to save sidebar state:", err);
    }
  }, [collapsed]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Close profile dropdown on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const navItems = [
    { icon: HomeIcon, label: "Home", to: "/" },
    { icon: ListOrdered, label: "Order Queue", to: "/orders" },
    { icon: BookOpen, label: "Menu Catalog", to: "/menu" },
    { icon: ClipboardList, label: "Inventory", to: "/inventory" },
    // Logout removed from sidebar; lives in profile menu
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 ${
      isActive ? "bg-white/10 border-l-4 border-secondary" : ""
    }`;

  const isAuthed = auth.isAuthed();
  const chefName = auth.getChefName();

  function doLogout() {
    auth.clear();
    setProfileOpen(false);
    // If you log out while on a protected route, go to /login; else keep on current page or go home
    const onProtected = ["/dashboard", "/orders", "/menu", "/inventory"].some(p => location.pathname.startsWith(p));
    navigate(onProtected ? "/login" : "/");
  }

  return (
    <div className="min-h-screen bg-bg text-[var(--text-primary)] flex">
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex lg:flex-col bg-primary text-white fixed h-screen p-4 overflow-y-auto transition-[width] duration-200 ${
          collapsed ? "lg:w-20" : "lg:w-64"
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/20 mb-4">
          <div className="flex items-center gap-2">
            <ChefHat className="text-secondary" size={28} />
            {!collapsed && <span className="text-2xl font-bold">DineEase</span>}
          </div>
          <button
            className="hidden lg:inline-flex p-1 rounded-md hover:bg-white/10"
            onClick={() => setCollapsed((v) => !v)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          </button>
        </div>

        <nav className="space-y-1">
  {navItems.map((item) => (
    <NavLink key={item.to} to={item.to} className={linkClass} title={item.label}>
      <item.icon size={20} />
      {!collapsed && <span>{item.label}</span>}
    </NavLink>
  ))}

  {/* Logout button in sidebar */}
  {isAuthed && (
    <button
      onClick={doLogout}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 mt-2"
    >
      <LogOutIcon size={20} />
      {!collapsed && <span>Logout</span>}
    </button>
  )}
</nav>
      </aside>

      {/* Mobile/Tablet drawer */}
      <aside
        className={`fixed inset-0 z-50 bg-black/50 lg:hidden ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } transition-opacity duration-200`}
        aria-hidden={!drawerOpen}
        onClick={() => setDrawerOpen(false)}
      >
        <div
          className={`w-64 bg-primary text-white h-full p-4 shadow-lg transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between text-2xl font-bold pb-4 border-b border-white/20 mb-4">
            <div className="flex items-center gap-2">
              <ChefHat className="text-secondary" size={28} />
              <span>DineEase</span>
            </div>
            <button onClick={() => setDrawerOpen(false)} className="p-1 rounded-md hover:bg-white/10">
              <CloseIcon size={24} />
            </button>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={() => setDrawerOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
            {/* Logout in mobile drawer if authed */}
            {isAuthed && (
              <button
                onClick={doLogout}
                className="w-full mt-2 flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10"
              >
                <LogOutIcon size={20} />
                <span>Logout</span>
              </button>
            )}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 p-4 transition-[margin] duration-200 ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        {/* Sticky header */}
        <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/60 border-b">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-2xl font-semibold text-primary">Chef Dashboard</h1>
            <div className="flex items-center gap-3">
              {/* Hamburger */}
              <button
                className="lg:hidden p-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon size={20} />
              </button>

              {/* Profile (desktop) */}
              {isAuthed ? (
                <div className="hidden lg:flex items-center gap-3 relative" ref={profileRef}>
                  <div
                    role="button"
                    className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-primary/10"
                    onClick={() => setProfileOpen((v) => !v)}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary text-white grid place-items-center font-semibold">
                      {chefName?.[0]?.toUpperCase() || "C"}
                    </div>
                    <div className="text-sm">
                      <div>{chefName || "Chef Suresh"}</div>
                      <div className="text-gray-500">Head Chef</div>
                    </div>
                  </div>

                  {/* Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-card border">
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-left"
                        onClick={() => { setProfileOpen(false); navigate('/profile'); }}
                      >
                        <User size={16} /> Profile
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-left"
                        onClick={() => { setProfileOpen(false); navigate('/settings'); }}
                      >
                        <Settings size={16} /> Settings
                      </button>
                      <div className="border-t my-1" />
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-[var(--accent)] hover:bg-gray-50 text-left"
                        onClick={doLogout}
                      >
                        <LogOutIcon size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden lg:flex">
                  <button
                    className="px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Routed pages render here */}
        <div className="pt-4">
          <Outlet />
          {children /* optional fallback */ }
        </div>
      </main>
    </div>
  );
}