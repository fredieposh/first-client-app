const trimSlash = (v: string): string => (v.replace(/\/+$/, ""));

export const API_URL = trimSlash(import.meta.env.VITE_API_URL ?? "http://localhost:3000");
export const PROFILE_APP_URL = trimSlash(import.meta.env.VITE_PROFILE_APP_URL ?? "http://localhost:5174");