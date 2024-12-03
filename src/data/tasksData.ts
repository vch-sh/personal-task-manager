import GetTasksResult from '@/types/GetTasksResult';

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
