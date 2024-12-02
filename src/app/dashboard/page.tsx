import { ChartColumn } from 'lucide-react';
import { auth } from '@/auth';
import { getDashboardData } from '@/app/data/getDashboardData';
import Header from '@/components/DashboardPage/Header';
import TaskStatistics from '@/components/DashboardPage/TaskStatistics';
import ErrorMessage from '@/components/general/ErrorMessage';
import { fetchTasks } from '@/utils/helpers';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <ErrorMessage message="User is not authenticated" />;
  }

  const tasks = await fetchTasks(session.user.id);

  if ('error' in tasks) {
    return <ErrorMessage message={tasks.error} />;
  }

  const { completedTasks, inProgressTasks, todoTasks } =
    getDashboardData(tasks);

  return (
    <main className="container mx-auto px-4 py-8 sm:py-4 h-screen max-w-5xl min-w-[360px]">
      <Header username={`Hi, ${session?.user.name}!` || 'Dashboard'} />

      {tasks.length > 0 ? (
        <TaskStatistics
          tasksQuantity={tasks.length}
          completedTasksQuantity={completedTasks.length}
          inProgressTasksQuantity={inProgressTasks.length}
          todoTasksQuantity={todoTasks.length}
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
