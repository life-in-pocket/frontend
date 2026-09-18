const BASE_URL = "http://127.0.0.1:8000";

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
        console.log("Деталі помилки з бекенду:", errorData);
        console.log("Деталі помилки:", JSON.stringify(errorData, null, 2));
        throw new Error(errorData.message || "An error occurred");
    }
    
    return response.json();
}

export default request;