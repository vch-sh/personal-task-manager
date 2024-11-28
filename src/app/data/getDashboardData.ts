import { getTasksByStatus } from '@/utils/helpers';
import Task from '@/types/Task';

export function getDashboardData(tasks: Task[]) {
  const completedTasks: Task[] = getTasksByStatus(tasks, 'done');
  const inProgressTasks: Task[] = getTasksByStatus(tasks, 'in-progress');
  const todoTasks: Task[] = getTasksByStatus(tasks, 'to-do');

  return { completedTasks, inProgressTasks, todoTasks };
}
