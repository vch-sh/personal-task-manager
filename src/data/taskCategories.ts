import GetTaskCategoriesResult from '@/types/GetTaskCategoriesResult';

export async function fetchTaskCategories(
  userId: string,
): Promise<GetTaskCategoriesResult> {
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
