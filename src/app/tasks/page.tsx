import { Metadata } from 'next';
import Header from '@/components/TasksPage/Header';
import Tasks from '@/components/TasksPage/Tasks';
import ErrorMessage from '@/components/general/ErrorMessage';
import { getTasksPageData } from '@/data/tasksPageData';
import { CompletedTasksContextProvider } from '@/contexts/CompletedTasksContextProvider';
import { FilteredTasksQuantityContextProvider } from '@/contexts/FilteredTasksQuantityContextProvider';
import { TaskCategoryContextProvider } from '@/contexts/TaskCategoryContextProvider';

export const metadata: Metadata = {
  title: 'Tasks',
};

export default async function TasksPage() {
  const { tasks, taskCategories, user } = await getTasksPageData();

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
            <Header taskCategories={taskCategories} user={user} />
            <Tasks tasks={tasks} taskCategories={taskCategories} />
          </main>
        </FilteredTasksQuantityContextProvider>
      </TaskCategoryContextProvider>
    </CompletedTasksContextProvider>
  );
}
