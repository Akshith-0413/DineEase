/**
 * Auth/profile helpers with safe localStorage access and linter-friendly catches.
 */

const LS_TOKEN   = "dineease.auth.token";
const LS_CHEF    = "dineease.auth.chef";     // display name (fallback if no profile)
const LS_PROFILE = "dineease.auth.profile";  // full profile object

// ——— Safe storage helpers ————————————————————————————————————————————————
const hasWindow  = typeof window !== "undefined";
const hasStorage = hasWindow && typeof window.localStorage !== "undefined";
const storage    = hasStorage ? window.localStorage : null;

function getItem(key) {
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch (e) {
    console.warn(`auth:getItem("${key}") failed`, e);
    return null;
  }
}

function setItem(key, value) {
  if (!storage) return;
  try {
    storage.setItem(key, value);
  } catch (e) {
    console.warn(`auth:setItem("${key}") failed`, e);
  }
}

function removeItem(key) {
  if (!storage) return;
  try {
    storage.removeItem(key);
  } catch (e) {
    console.warn(`auth:removeItem("${key}") failed`, e);
  }
}

// ——— Public API ————————————————————————————————————————————————
export const auth = {
  // Token
  getToken() {
    return getItem(LS_TOKEN);
  },

  setToken(token) {
    setItem(LS_TOKEN, token);
  },

  clear() {
    removeItem(LS_TOKEN);
    removeItem(LS_CHEF);
    removeItem(LS_PROFILE);
  },

  isAuthed() {
    return !!auth.getToken();
  },

  // Display name helpers
  getChefName() {
    const p = auth.getChef();
    if (p && p.fullName) return p.fullName;
    return getItem(LS_CHEF) || "Chef Suresh";
  },

  setChefName(name) {
    setItem(LS_CHEF, name);
    const p = auth.getChef() || {};
    p.fullName = name;
    setItem(LS_PROFILE, JSON.stringify(p));
  },

  // Full profile helpers
  /** shape: { id, fullName, email, role, organizationId } */
  getChef() {
    const v = getItem(LS_PROFILE);
    if (!v) return null;
    try {
      return JSON.parse(v);
    } catch (e) {
      console.warn("auth:getChef parse failed; clearing LS_PROFILE", e);
      removeItem(LS_PROFILE);
      return null;
    }
  },

  setChef(profile) {
    const safe = profile || {};
    setItem(LS_PROFILE, JSON.stringify(safe));
    if (safe && typeof safe.fullName === "string" && safe.fullName.length > 0) {
      setItem(LS_CHEF, safe.fullName);
    }
  },

  updateChef(partial) {
    const current = auth.getChef() || {};
    const next = { ...current, ...(partial || {}) };
    auth.setChef(next);
    return next;
  },
};