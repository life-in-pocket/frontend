import request from "./client";
import type { Task, StatisticBlock } from "../types/block";
import type { User } from "../types/user";

interface ApiTask {
    id: number;
    title: string;
    target_default: number;
}

interface ApiDayTask {
    id: number;
    task_id: number;
    date: string;
    is_active: boolean;
    time: number;
    target: number;
    description: string | null;
    task: ApiTask;
}

function mapBlock(raw: ApiDayTask): Task {
    return {
        id: raw.id,
        taskId: raw.task_id,
        date: raw.date,
        isActive: raw.is_active,
        time: raw.time,
        target: raw.target,
        description: raw.description,
        title: raw.task.title,
    };
}

export interface CreateBlockPayload {
    title: string;
    time: number;
    target: number;
    date: string;
}

export interface UpdateBlockPayload {
    title: string;
    time: number;
    target: number;
}

export const getTasks = async (date: string): Promise<Task[]> => {
    const data = await request<ApiDayTask[]>(`/days/${date}/tasks`);
    return data.map(mapBlock);
};

export const createTask = async (payload: CreateBlockPayload): Promise<Task> => {
    const data = await request<ApiDayTask>("/days/day-tasks", {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return mapBlock(data);
};

export const updateTask = async (id: number, payload: UpdateBlockPayload): Promise<Task> => {
    const data = await request<ApiDayTask>(`/days/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
    return mapBlock(data);
};

export const updateDescription = async (id: number, description: string | null): Promise<Task> => {
    const data = await request<ApiDayTask>(`/days/${id}/description`, {
        method: "PUT",
        body: JSON.stringify({ description }),
    });
    return mapBlock(data);
};

export const updateTime = async (id: number, time: number): Promise<Task> => {
    const data = await request<ApiDayTask>(`/days/${id}/time`, {
        method: "PATCH",
        body: JSON.stringify({ time }),
    });
    return mapBlock(data);
};

export const deleteTask = (id: number): Promise<void> =>
    request<void>(`/days/${id}`, { method: "DELETE" });

export const getUser = (): Promise<User> =>
    request<User>("/days/user");

export const getStatistic = (firstDate: string, lastDate: string): Promise<StatisticBlock[]> =>
    request<StatisticBlock[]>(`/days/statistic?first_date=${firstDate}&last_date=${lastDate}`);