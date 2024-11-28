import Task from '@/types/Task';

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
export const passwordRegex = /[!@#$%]+/;

export function getTasksByStatus(tasks: Task[], value: string) {
  return tasks.filter((task: Task) => task.status === value);
}
