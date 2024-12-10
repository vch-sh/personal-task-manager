import { Metadata } from 'next';
import { ChartColumn } from 'lucide-react';
import { auth } from '@/auth';
import Header from '@/components/DashboardPage/Header';
import TaskStatistics from '@/components/DashboardPage/TaskStatistics';
import ErrorMessage from '@/components/general/ErrorMessage';
import { getDashboardData } from '@/data/dashboardData';
import { fetchTaskCategories } from '@/data/taskCategories';
import { fetchTasks } from '@/data/tasksData';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
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

  const {
    completedTasks,
    inProgressTasks,
    todoTasks,
    tasksQuantityByCategory,
  } = getDashboardData(tasks, taskCategories);

  return (
    <main className="container mx-auto px-4 py-8 sm:py-4 h-screen max-w-5xl min-w-[360px]">
      <Header username={`Hi, ${session?.user.name}!` || 'Dashboard'} />

      {tasks.length > 0 ? (
        <TaskStatistics
          tasksQuantity={tasks.length}
          completedTasksQuantity={completedTasks.length}
          inProgressTasksQuantity={inProgressTasks.length}
          todoTasksQuantity={todoTasks.length}
          tasksQuantityByCategory={tasksQuantityByCategory.slice(1)}
        />
      ) : (
        <p className="text-default text-sm flex items-center justify-center gap-2 font-semibold">
          <ChartColumn />
          Add your first task to get started with statistics
        </p>
      )}
    </main>
  );
}
