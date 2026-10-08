const TOKEN = "access_token";
export const getToken = (): string | null => localStorage.getItem(TOKEN);
export const setToken = (accessToken: string): void => localStorage.setItem(TOKEN, accessToken);
export const deleteToken = (): void => localStorage.removeItem(TOKEN);