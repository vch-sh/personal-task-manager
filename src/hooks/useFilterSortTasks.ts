import { useCallback, useState } from 'react';
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

  const filterByCompleted = useCallback(
    (task: Task) => (isCompletedHidden ? task.status !== 'done' : task),
    [isCompletedHidden],
  );

  const filterByCategory = useCallback(
    (task: Task) => {
      if (category._id === 'all') return true;
      return category._id.toString() === task.category;
    },
    [category._id],
  );

  const filterByStatus = useCallback(
    (task: Task) => {
      if (filter === 'all') return true;
      return filter === task.status;
    },
    [filter],
  );

  const sortByDueDate = useCallback(
    (a: Task, b: Task) => {
      const dateA = new Date(a.dueDate || 0);
      const dateB = new Date(b.dueDate || 0);
      return dateA.getTime() - dateB.getTime();
    },
    [sort],
  );

  const sortByPriority = useCallback(
    (a: Task, b: Task) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    },
    [sort],
  );

  const filteredSortedTasks = tasks
    .filter(filterByCompleted)
    .filter(filterByCategory)
    .filter(filterByStatus)
    .sort((a, b) => {
      if (sort === 'due-date') {
        return sortByDueDate(a, b);
      }
      if (sort === 'priority') {
        return sortByPriority(a, b);
      }
      return 0;
    });

  return {
    filteredSortedTasks,
    filter,
    sort,
    category,
    setCategory,
    setFilter,
    setSort,
  };
}
