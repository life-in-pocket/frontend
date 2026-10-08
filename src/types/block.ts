export interface Task {
  id: number;
  taskId: number;
  date: string;
  isActive: boolean;
  time: number;
  target: number;
  description: string | null;
  title: string;
}

export interface StatisticBlock {
    title: string;
    records: { date: string; time: number }[];
}