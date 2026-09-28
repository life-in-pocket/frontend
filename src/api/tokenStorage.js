const TOKEN = "access_token"
export const getToken = () => localStorage.getItem(TOKEN)
export const setToken = (accessToken) => localStorage.setItem(TOKEN, accessToken)