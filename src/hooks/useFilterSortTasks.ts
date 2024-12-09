import { useState } from 'react';
import Task from '@/types/Task';
import { useCompletedTasks } from './useCompletedTasks';
import { useTaskCategory } from './useTaskCategory';

type useFilterSortTasksProps = {
  tasks: Task[];
};

export function useFilterSortTasks({ tasks }: useFilterSortTasksProps) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('due-date');

  const { category, setCategory } = useTaskCategory();
  const { isCompletedHidden } = useCompletedTasks();

  const filteredSortedTasks = tasks
    .filter((task) => (isCompletedHidden ? task.status !== 'done' : task))
    .filter((task) => {
      if (category._id === 'all') return true;
      return category._id.toString() === task.category;
    })
    .filter((task) => {
      if (filter === 'all') return true;
      return filter === task.status;
    })
    .sort((a, b) => {
      if (sort === 'due-date') {
        const dateA = new Date(a.dueDate || 0);
        const dateB = new Date(b.dueDate || 0);
        return dateA.getTime() - dateB.getTime();
      }
      if (sort === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  return { filteredSortedTasks, category, setCategory, setFilter, setSort };
}
