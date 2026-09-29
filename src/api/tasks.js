import request from "./client";

export const getTasks = async (date) => request(`/days/${date}/tasks`)
export const createTask = async (task) => request("/days/day-tasks", {
    method: "POST",
    body: JSON.stringify(task),
});
export const updateTask = async (taskId, task) => request(`/days/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(task),
});
export const updateDescription = async (taskId, task) => request(`/days/${taskId}/description`, {
    method: "PUT",
    body: JSON.stringify(task),
})
export const updateTime = async (taskId, time) => request(`/days/${taskId}/time`, {
    method: "PATCH",
    body: JSON.stringify({ time }),
})
export const deleteTask = async (taskId) => request(`/days/${taskId}`, {
    method: "DELETE",
});


export const getUser = () => request("/days/username")