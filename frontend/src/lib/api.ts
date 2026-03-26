const API_URL = import.meta.env.VITE_API_URL || "https://phishguard-ai-3-12rf.onrender.com/api";

export const api = {
  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("API Request Failed");
    return response.json();
  },
  async get(endpoint: string, params?: Record<string, string>) {
    const url = new URL(`${API_URL}${endpoint}`);
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("API Request Failed");
    return response.json();
  },
};
