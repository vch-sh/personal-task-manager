import { auth } from '@/auth';
import { fetchTaskCategories, fetchTasks } from '@/lib/tasks';
import { fetchUserById } from '@/lib/users';

export async function getDashboardPageData() {
  const session = await auth();
  const tasks = await fetchTasks(session?.user.id);
  const taskCategories = await fetchTaskCategories(session?.user.id);
  const user = await fetchUserById(session?.user.id);

  return { tasks, taskCategories, user };
}
