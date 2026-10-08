import { getToken, deleteToken } from "./tokenStorage";

const BASE_URL = "http://127.0.0.1:8000";

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

interface ValidationItem {
    msg: string;
    loc: (string | number)[];
}

interface ErrorBody {
    detail?: string | ValidationItem[];
}

function extractMessage(body: ErrorBody | null): string {
    if (!body?.detail) return "An error occurred";
    if (typeof body.detail === "string") return body.detail;
    return body.detail.map((item) => item.msg).join(", ");
}

async function request<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();

    const headers = new Headers(options.headers);
    if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

    if (response.status === 401 && token) {
        deleteToken();
        window.location.href = "/login";
        return new Promise<T>(() => {});
    }

    if (!response.ok) {
        const body: ErrorBody | null = await response.json().catch(() => null);
        throw new ApiError(extractMessage(body), response.status);
    }

    const text = await response.text();
    return (text ? JSON.parse(text) : undefined) as T;
}

export default request;