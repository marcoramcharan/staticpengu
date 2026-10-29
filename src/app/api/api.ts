import { useStore2 } from "../store/store2";

export const API_URL = "https://mc-lxcrvq0y7t.b-cdn.net";

export type ApiResult<T = any> = {
  ok: boolean;
  status: number;
  data: T;
};

// Thin fetch wrapper: sends the auth token, parses JSON, and logs the
// user out locally if the server says the session is gone (401).
export async function api<T = any>(
  path: string,
  init: RequestInit = {}
): Promise<ApiResult<T>> {
  const headers = new Headers(init.headers);
  const isForm = typeof FormData !== "undefined" && init.body instanceof FormData;

  if (init.body && !isForm && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // CHANGED: send the token as a header (cross-site cookies get blocked).
  const token = useStore2.getState().token;
  if (token) headers.set("Authorization", `Bearer ${token}`);

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers,
      credentials: "include",
    });

    let data: any = {};
    try {
      data = await res.json();
    } catch {
      /* empty or non-JSON body */
    }

    if (res.status === 401) {
      useStore2.getState().logout();
    }

    return { ok: res.ok, status: res.status, data };
  } catch {
    return {
      ok: false,
      status: 0,
      data: { error: "Could not connect to the server." } as any,
    };
  }
}
