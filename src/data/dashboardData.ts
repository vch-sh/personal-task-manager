import { getTasksByStatus } from '@/lib/helpers';
import Task from '@/types/Task';
import TaskCategory from '@/types/TaskCategory';

export function getDashboardData(
  tasks: Task[],
  taskCategories: TaskCategory[],
) {
  const completedTasks: Task[] = getTasksByStatus(tasks, 'done');
  const inProgressTasks: Task[] = getTasksByStatus(tasks, 'in-progress');
  const todoTasks: Task[] = getTasksByStatus(tasks, 'to-do');

  const tasksQuantityByCategory = taskCategories.map((taskCategory) => ({
    category: taskCategory.name,
    color: taskCategory.color,
    count: tasks.filter((task) => task.category === taskCategory._id).length,
  }));

  return {
    completedTasks,
    inProgressTasks,
    todoTasks,
    tasksQuantityByCategory,
  };
}
