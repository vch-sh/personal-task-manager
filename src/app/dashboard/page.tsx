import { Metadata } from 'next';
import { ChartColumn } from 'lucide-react';
import Header from '@/components/DashboardPage/Header';
import TaskStatistics from '@/components/DashboardPage/TaskStatistics';
import ErrorMessage from '@/components/general/ErrorMessage';
import { getDashboardTasksPagesData } from '@/data/commonPageData';
import { getDashboardDataToDisplay } from '@/data/dashboardDataToDisplay';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const { tasks, taskCategories, user, error } =
    await getDashboardTasksPagesData();

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const {
    completedTasks,
    inProgressTasks,
    todoTasks,
    tasksQuantityByCategory,
  } = getDashboardDataToDisplay(tasks, taskCategories);

  return (
    <main className="container mx-auto min-h-screen min-w-[360px] max-w-5xl px-4 py-8 text-lg sm:py-4">
      <Header username={user ? `Hi, ${user.name}!` : 'Dashboard'} />

      {tasks.length > 0 ? (
        <TaskStatistics
          tasksQuantity={tasks.length}
          completedTasksQuantity={completedTasks.length}
          inProgressTasksQuantity={inProgressTasks.length}
          todoTasksQuantity={todoTasks.length}
          tasksQuantityByCategory={tasksQuantityByCategory.slice(1)}
        />
      ) : (
        <p className="text-default flex items-center justify-center gap-2 text-sm font-semibold dark:text-neutral-200">
          <ChartColumn />
          Add your first task to get started with statistics
        </p>
      )}
    </main>
  );
}
