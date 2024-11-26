import { auth } from '@/auth';
import Filtering from '@/components/TasksPage/Filtering';
import Header from '@/components/TasksPage/Header';
import TasksTable from '@/components/TasksPage/TasksTable';
import { getTasks } from '@/actions/GetTasks';
import Task from '@/types/Task';

export default async function Tasks() {
  const session = await auth();
  const tasks: Task[] = await getTasks(session?.user.id);

  return (
    <main className="container mx-auto p-4 h-screen max-w-5xl min-w-[360px]">
      <Header tasksQuantity={tasks.length} />
      <Filtering tasksQuantity={tasks.length} />
      <TasksTable tasks={tasks} />
    </main>
  );
}
