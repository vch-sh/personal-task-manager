import { useState } from 'react';
import Task from '@/types/Task';

type useFilterSortTasksProps = {
  tasks: Task[];
};

export function useFilterSortTasks({ tasks }: useFilterSortTasksProps) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('due-date');

  const filteredSortedTasks = tasks
    ?.filter((task) => {
      if (filter === 'all') return true;
      return task.status === filter;
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

  return { filteredSortedTasks, setFilter, setSort };
}
