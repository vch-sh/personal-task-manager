import { auth } from '@/auth';
import Filtering from '@/components/TasksPage/Filtering';
import Header from '@/components/TasksPage/Header';
import TasksTable from '@/components/TasksPage/TasksTable';
import ErrorMessage from '@/components/general/ErrorMessage';
import { fetchTasks } from '@/utils/helpers';

export default async function TasksPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <ErrorMessage message="User is not authenticated" />;
  }

  const tasks = await fetchTasks(session.user.id);

  if ('error' in tasks) {
    return <ErrorMessage message={tasks.error} />;
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:py-4 h-screen max-w-5xl min-w-[360px]">
      <Header tasksQuantity={tasks.length} />
      <Filtering tasksQuantity={tasks.length} />
      <TasksTable tasks={tasks} />
    </main>
  );
}
