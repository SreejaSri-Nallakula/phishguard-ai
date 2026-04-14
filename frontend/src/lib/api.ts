const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = {
  async request(endpoint: string, method: string, data?: any) {
    const token = localStorage.getItem("phishguard_token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const config: RequestInit = {
      method,
      headers,
    };
    if (data) config.body = JSON.stringify(data);

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const text = await response.text();
    let json: any;
    try { json = JSON.parse(text); } catch { json = null; }

    if (!response.ok) {
      throw new Error(json?.error || json?.message || "API Request Failed");
    }
    return json;
  },

  async post(endpoint: string, data: any) {
    return this.request(endpoint, "POST", data);
  },

  async put(endpoint: string, data: any) {
    return this.request(endpoint, "PUT", data);
  },

  async get(endpoint: string, params?: Record<string, string>) {
    const url = new URL(`${API_URL}${endpoint}`);
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    
    // Manual handling for GET because it uses the request method but the URL might have params
    return this.request(`${endpoint}${url.search}`, "GET");
  },
};

