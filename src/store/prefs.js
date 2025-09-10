/**
 * UI preferences with safe localStorage & linter-friendly catches.
 */
const LS_PREFS = "dineease.ui.prefs";

/**
 * shape:
 * {
 *   defaultLanding: "/dashboard" | "/orders",
 *   sidebarCollapsed: boolean,
 *   sounds: boolean,
 *   notifications: boolean
 * }
 */
const DEFAULTS = {
  defaultLanding: "/dashboard",
  sidebarCollapsed: false,
  sounds: true,
  notifications: true,
};

// ——— Safe storage helpers ————————————————————————————————————————————————
const hasWindow  = typeof window !== "undefined";
const hasStorage = hasWindow && typeof window.localStorage !== "undefined";
const storage    = hasStorage ? window.localStorage : null;

function getItem(key) {
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch (e) {
    console.warn(`prefs:getItem("${key}") failed`, e);
    return null;
  }
}

function setItem(key, value) {
  if (!storage) return;
  try {
    storage.setItem(key, value);
  } catch (e) {
    console.warn(`prefs:setItem("${key}") failed`, e);
  }
}

// ——— Public API ————————————————————————————————————————————————
export const prefs = {
  load() {
    const v = getItem(LS_PREFS);
    if (!v) return { ...DEFAULTS };
    try {
      return { ...DEFAULTS, ...JSON.parse(v) };
    } catch (e) {
      console.warn("prefs: corrupted JSON, resetting to defaults", e);
      return { ...DEFAULTS };
    }
  },

  save(p) {
    setItem(LS_PREFS, JSON.stringify(p));
  },

  set(partial) {
    const cur = prefs.load();
    const next = { ...cur, ...partial };
    prefs.save(next);
    return next;
  },

  get() {
    return prefs.load();
  },
};