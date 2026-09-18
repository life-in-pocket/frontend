import request from "./client";

export const getTasks = async () => request("/")
export const createTask = async (task) => request("/", {
    method: "POST",
    body: JSON.stringify(task),
});