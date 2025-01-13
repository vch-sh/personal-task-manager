import { auth } from '@/auth';
import { getTaskCategoriesFromApi } from '@/lib/categories';
import { getSettings } from '@/lib/settings';
import { getTasksFromApi } from '@/lib/tasks';
import { getUserByIdFromDb } from '@/lib/users';

export async function getDashboardTasksPagesData() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error('User not authenticated');
    }

    const tasks = await getTasksFromApi(session?.user.id);
    const taskCategories = await getTaskCategoriesFromApi(session?.user.id);
    const user = await getUserByIdFromDb(session?.user.id);
    const settings = await getSettings(session?.user.id);

    return { tasks, taskCategories, user, settings };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
