const BASE_URL = "http://127.0.0.1:8000/days";

async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
    }
    
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

export default request;