import { Metadata } from 'next';
import Header from '@/components/TasksPage/Header';
import Tasks from '@/components/TasksPage/Tasks';
import ErrorMessage from '@/components/general/ErrorMessage';
import ScrollTop from '@/components/general/ScrollTop';
import { getDashboardTasksPagesData } from '@/data/commonPageData';
import { FilteredTasksQuantityContextProvider } from '@/contexts/FilteredTasksQuantityContextProvider';
import { TaskCategoryContextProvider } from '@/contexts/TaskCategoryContextProvider';

export const metadata: Metadata = {
  title: 'Tasks',
};

export default async function TasksPage() {
  const { tasks, taskCategories, user, settings, error } =
    await getDashboardTasksPagesData();

  if (error) {
    return <ErrorMessage message={error} />;
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
          <ScrollTop />
        </main>
      </FilteredTasksQuantityContextProvider>
    </TaskCategoryContextProvider>
  );
}
