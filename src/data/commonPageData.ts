import { auth } from '@/auth';
import { fetchTaskCategories } from '@/lib/categories';
import { getSettings } from '@/lib/settings';
import { fetchTasks } from '@/lib/tasks';
import { fetchUserById } from '@/lib/users';

export async function getDashboardTasksPagesData() {
  const session = await auth();
  const tasks = await fetchTasks(session?.user.id);
  const taskCategories = await fetchTaskCategories(session?.user.id);
  const user = await fetchUserById(session?.user.id);
  const settings = await getSettings(session?.user.id);

  return { tasks, taskCategories, user, settings };
}
