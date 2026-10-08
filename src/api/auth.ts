import request from "./client";

export const register = (data: { username: string; email: string; password: string }) =>
    request("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const login = (data: { email: string; password: string }) =>
    request("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
    });