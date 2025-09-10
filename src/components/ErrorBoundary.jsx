import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Visible in DevTools; replace with your logging/telemetry if needed.
    console.error("ErrorBoundary caught error:", error, info);
  }

  clearStorageAndReload = () => {
    // Guarded, no try/catch needed.
    const hasWindow = typeof window !== "undefined";
    const hasLS = hasWindow && window.localStorage;
    if (hasLS) {
      const ls = window.localStorage;
      ls.removeItem("dineease.auth.profile");
      ls.removeItem("dineease.auth.chef");
      ls.removeItem("dineease.auth.token");
      ls.removeItem("dineease.ui.prefs");
    }
    // Full reload to reset React state
    if (hasWindow && window.location) {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen grid place-items-center p-6 bg-[#F5F5F5]">
          <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-[var(--accent)]">
              Something went wrong
            </h2>
            <pre className="mt-3 text-xs overflow-auto whitespace-pre-wrap text-gray-700">
              {String(this.state.error)}
            </pre>
            <div className="mt-4 flex gap-2">
              <button
                className="px-3 py-1.5 rounded-md border"
                onClick={() => (typeof window !== "undefined" ? window.location.reload() : null)}
              >
                Reload
              </button>
              <button
                className="px-3 py-1.5 rounded-md border"
                onClick={this.clearStorageAndReload}
              >
                Clear storage & reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}