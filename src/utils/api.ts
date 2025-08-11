// Centralized API base URL for the backend
// Uses Vite env var if available, otherwise falls back to production URL
export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL ||
  (typeof process !== 'undefined' ? (process as any).env?.VITE_API_BASE_URL : undefined) ||
  'https://stile-backend.vercel.app';

export function apiUrl(path: string): string {
  if (!path.startsWith('/')) path = `/${path}`;
  return `${API_BASE_URL}${path}`;
}

