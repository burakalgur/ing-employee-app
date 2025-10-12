import locales from "../locales/index.js";

function getCurrentLang() {
  const lang = document.documentElement.lang || "en";
  return lang.startsWith("tr") ? "tr" : "en";
}

function resolveNested(obj, path) {
  return path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), obj);
}

function interpolate(str, params = {}) {
  if (typeof str !== "string") return str;
  return str.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, key) => {
    const val = params[key.trim()];
    return val === undefined || val === null ? "" : String(val);
  });
}

export function t(key, params) {
  const lang = getCurrentLang();
  const raw = resolveNested(locales[lang], key) ?? key; // fallback: key
  return interpolate(raw, params);
}
