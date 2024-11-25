import Filtering from '@/components/TasksPage/Filtering';
import Header from '@/components/TasksPage/Header';
import TasksTable from '@/components/TasksPage/TasksTable';

export default function Tasks() {
  return (
    <main className="container mx-auto p-4 h-screen max-w-5xl min-w-[360px]">
      <Header />
      <Filtering />
      <TasksTable />
    </main>
  );
}
