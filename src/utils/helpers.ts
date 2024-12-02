import GetTasksResult from '@/types/GetTasksResult';
import Task from '@/types/Task';

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
export const passwordRegex = /[!@#$%]+/;

export function getTasksByStatus(tasks: Task[], value: string) {
  return tasks.filter((task: Task) => task.status === value);
}

export async function fetchTasks(userId: string): Promise<GetTasksResult> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/tasks?userId=${encodeURIComponent(userId)}`,
      { cache: 'force-cache' },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch tasks: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
