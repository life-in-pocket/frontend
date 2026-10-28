import request from "./client";
import type { User } from "../types/user";

export interface LoginResponse {
  access_token: string;
  token_type?: string;
}

export const register = (data: { username: string; email: string; password: string }): Promise<void> =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const login = (data: { email: string; password: string }): Promise<LoginResponse> =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const verifyEmail = (token: string): Promise<void> =>
  request("/auth/verify", {
    method: "POST",
    body: JSON.stringify({ token }),
  });