import { auth } from '@/auth';
import { getTasksAndCategoriesFromApi } from '@/lib/api';
import { getSettings } from '@/lib/settings';
import { getUserByIdFromDb } from '@/lib/users';

export async function getDashboardTasksPagesData() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error('User not authenticated');
    }

    const tasks = await getTasksAndCategoriesFromApi(
      'tasks',
      session?.user.id,
      'Failed to fetch tasks',
    );
    const taskCategories = await getTasksAndCategoriesFromApi(
      'task-categories',
      session?.user.id,
      'Failed to fetch task categories',
    );
    const user = await getUserByIdFromDb(session?.user.id);
    const settings = await getSettings(session?.user.id);

    return { tasks, taskCategories, user, settings };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
