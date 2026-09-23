const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(public status: number, public details: unknown) {
    super(typeof details === "object" && details && "detail" in details ? String(details.detail) : "Request failed");
  }
}

export type ApiList<T> = T[] | { results: T[]; count: number; next: string | null; previous: string | null };

export function unwrapList<T>(payload: ApiList<T>): T[] {
  return Array.isArray(payload) ? payload : payload.results;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", Accept: "application/json", ...(options.headers || {}) },
    });
  } catch {
    throw new ApiError(0, { detail: `Donation/content API is unavailable at ${API_BASE_URL}. Start Django with: cd backend; python manage.py runserver` });
  }
  const body = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(response.status, body);
  return body as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  getList: <T>(path: string) => request<ApiList<T>>(path).then(unwrapList),
  post: <T>(path: string, data: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(data) }),
};
