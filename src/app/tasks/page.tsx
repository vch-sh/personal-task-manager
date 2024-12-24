import { Metadata } from 'next';
import { auth } from '@/auth';
import Header from '@/components/TasksPage/Header';
import Tasks from '@/components/TasksPage/Tasks';
import ErrorMessage from '@/components/general/ErrorMessage';
import { fetchUserById } from '@/lib/users';
import { fetchTaskCategories } from '@/data/taskCategories';
import { fetchTasks } from '@/data/tasksData';
import { CompletedTasksContextProvider } from '@/contexts/CompletedTasksContextProvider';
import { FilteredTasksQuantityContextProvider } from '@/contexts/FilteredTasksQuantityContextProvider';
import { TaskCategoryContextProvider } from '@/contexts/TaskCategoryContextProvider';

export const metadata: Metadata = {
  title: 'Tasks',
};

export default async function TasksPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <ErrorMessage message="User is not authenticated" />;
  }

  const tasks = await fetchTasks(session.user.id);
  const taskCategories = await fetchTaskCategories(session.user.id);
  const user = await fetchUserById(session?.user.id);

  if ('error' in tasks) {
    return <ErrorMessage message={tasks.error} />;
  }

  if ('error' in taskCategories) {
    return <ErrorMessage message={taskCategories.error} />;
  }

  if (user && 'error' in user) {
    return <ErrorMessage message={user.error} />;
  }

  return (
    <CompletedTasksContextProvider>
      <TaskCategoryContextProvider>
        <FilteredTasksQuantityContextProvider>
          <main className="container mx-auto min-h-screen min-w-[360px] max-w-5xl px-4 py-8 sm:py-4">
            <Header
              taskCategories={taskCategories}
              user={user}
            />
            <Tasks tasks={tasks} taskCategories={taskCategories} />
          </main>
        </FilteredTasksQuantityContextProvider>
      </TaskCategoryContextProvider>
    </CompletedTasksContextProvider>
  );
}
