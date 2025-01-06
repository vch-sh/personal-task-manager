import { auth } from '@/auth';
import { fetchTaskCategories } from '@/lib/categories';
import { fetchTasks } from '@/lib/tasks';
import { fetchUserById } from '@/lib/users';

export async function getTasksPageData() {
  const session = await auth();
  const tasks = await fetchTasks(session?.user.id);
  const taskCategories = await fetchTaskCategories(session?.user.id);
  const user = await fetchUserById(session?.user.id);

  return { tasks, taskCategories, user };
}
