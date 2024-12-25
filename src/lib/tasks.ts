import GetCategoriesResult from '@/types/GetCategoriesResult';
import GetTasksResult from '@/types/GetTasksResult';

export async function fetchTaskCategories(
  userId: string,
): Promise<GetCategoriesResult> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/task-categories?userId=${encodeURIComponent(userId)}`,
      {
        cache: 'force-cache',
      },
    );

    if (!res.ok) {
      return { error: 'Failed to fetch task categories' };
    }

    return await res.json();
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function fetchTasks(userId: string): Promise<GetTasksResult> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/tasks?userId=${encodeURIComponent(userId)}`,
      { cache: 'force-cache' },
    );

    if (!res.ok) {
      return { error: 'Failed to fetch tasks' };
    }

    return await res.json();
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
