import { Metadata } from 'next';
import { auth } from '@/auth';
import Header from '@/components/TasksPage/Header';
import Tasks from '@/components/TasksPage/Tasks';
import ErrorMessage from '@/components/general/ErrorMessage';
import { fetchTaskCategories } from '@/data/taskCategories';
import { fetchTasks } from '@/data/tasksData';
import { CompletedTasksContextProvider } from '@/contexts/CompletedTasksContextProvider';
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

  if ('error' in tasks) {
    return <ErrorMessage message={tasks.error} />;
  }

  if ('error' in taskCategories) {
    return <ErrorMessage message={taskCategories.error} />;
  }

  return (
    <CompletedTasksContextProvider>
      <TaskCategoryContextProvider>
        <main className="container mx-auto px-4 py-8 sm:py-4 h-screen max-w-5xl min-w-[360px]">
          <Header
            tasksQuantity={tasks.length}
            taskCategories={taskCategories}
          />
          <Tasks tasks={tasks} taskCategories={taskCategories} />
        </main>
      </TaskCategoryContextProvider>
    </CompletedTasksContextProvider>
  );
}
