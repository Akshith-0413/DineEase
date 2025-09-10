
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Lock, Mail, ChefHat } from "lucide-react";
import { auth } from "../store/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      // TODO: replace with real API call:
      // const res = await api.loginChef({ email, password: pass });
      // auth.setToken(res.data.token); auth.setChefName(res.data.chef.first_name + " " + res.data.chef.last_name);
      // Demo: accept anything non-empty
      if (!email || !pass) throw new Error("Please enter email & password");
      auth.setToken("demo-token");
      auth.setChefName(email.includes("@") ? email.split("@")[0] : "Chef Suresh");
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-bg p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <ChefHat className="text-secondary" size={28} />
          <h1 className="text-2xl font-semibold text-primary">DineEase – Chef</h1>
        </div>
        <p className="text-gray-600 text-sm mb-6">Sign in to manage your kitchen flow.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="flex items-center gap-2 px-3 py-2 border rounded-md focus-within:ring-2 focus-within:ring-primary/30">
              <Mail size={16} className="text-gray-500" />
              <input
                type="email"
                className="w-full outline-none"
                placeholder="chef@dineease.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="flex items-center gap-2 px-3 py-2 border rounded-md focus-within:ring-2 focus-within:ring-primary/30">
              <Lock size={16} className="text-gray-500" />
              <input
                type="password"
                className="w-full outline-none"
                placeholder="••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>

          {err && <div className="text-[var(--accent)] text-sm">{err}</div>}

          <button
            type="submit"
            disabled={loading}
            className="btn-hover w-full px-4 py-2 rounded-md bg-primary text-white disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-xs text-gray-500 mt-4">
          <span>Demo tip: any email/password works.</span>
        </div>

        <div className="text-xs text-gray-400 mt-4">
          <Link to="/" className="hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}