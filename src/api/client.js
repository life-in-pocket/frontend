import { getToken, deleteToken } from "./tokenStorage";

const BASE_URL = "http://127.0.0.1:8000";

async function request(endpoint, options = {}) {
    const token = getToken();
    const url = `${BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    });

    if (response.status === 401) {
        deleteToken();
        window.location.href = "/login";
        return new Promise(() => {});
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
    }
    
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

export default request;