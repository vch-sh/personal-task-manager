import { auth } from '@/auth';
import { getDashboardData } from '@/app/data/getDashboardData';
import Header from '@/components/DashboardPage/Header';
import TaskStatistics from '@/components/DashboardPage/TaskStatistics';
import { getTasks } from '@/actions/GetTasks';
import Task from '@/types/Task';

export default async function DashboardPage() {
  const session = await auth();
  const tasks: Task[] = await getTasks(session?.user.id);
  const { completedTasks, inProgressTasks, todoTasks } =
    getDashboardData(tasks);

  return (
    <main className="container mx-auto p-4 h-screen max-w-5xl min-w-[360px]">
      <Header />

      {tasks.length > 0 ? (
        <TaskStatistics
          tasksQuantity={tasks.length}
          completedTasksQuantity={completedTasks.length}
          inProgressTasksQuantity={inProgressTasks.length}
          todoTasksQuantity={todoTasks.length}
        />
      ) : (
        <p className="text-default text-sm text-center font-semibold">
          Add your first task to get started with statistics
        </p>
      )}
    </main>
  );
}
