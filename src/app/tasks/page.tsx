import { Metadata } from 'next';
import Header from '@/components/TasksPage/Header';
import Tasks from '@/components/TasksPage/Tasks';
import ErrorMessage from '@/components/general/ErrorMessage';
import { getDashboardTasksPagesData } from '@/data/commonPageData';
import { FilteredTasksQuantityContextProvider } from '@/contexts/FilteredTasksQuantityContextProvider';
import { TaskCategoryContextProvider } from '@/contexts/TaskCategoryContextProvider';

export const metadata: Metadata = {
  title: 'Tasks',
};

export default async function TasksPage() {
  const { tasks, taskCategories, user, settings } =
    await getDashboardTasksPagesData();

  if (
    'error' in tasks ||
    'error' in taskCategories ||
    'error' in user ||
    'error' in settings
  ) {
    return (
      <ErrorMessage
        message={tasks.error || taskCategories.error || user.error}
      />
    );
  }

  return (
    <TaskCategoryContextProvider>
      <FilteredTasksQuantityContextProvider>
        <main className="container mx-auto min-h-screen min-w-[360px] max-w-5xl px-4 py-8 sm:py-4">
          <Header taskCategories={taskCategories} user={user} />
          <Tasks
            tasks={tasks}
            taskCategories={taskCategories}
            settings={settings}
          />
        </main>
      </FilteredTasksQuantityContextProvider>
    </TaskCategoryContextProvider>
  );
}
