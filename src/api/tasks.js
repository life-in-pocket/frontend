import request from "./client";

export const getTasks = async () => request("/")
export const createTask = async (task) => request("/", {
    method: "POST",
    body: JSON.stringify(task),
});
export const updateTask = async (taskId, task) => request(`/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(task),
});
export const updateTime = async (taskId, task) => request(`/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(task),
})
export const deleteTask = async (taskId) => request(`/${taskId}`, {
    method: "DELETE",
});