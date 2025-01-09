import { useCallback, useEffect, useState } from 'react';
import Task from '@/types/Task';
import { useFilteredTasksQuantity } from './useFilteredTasksQuantity';
import { useTaskCategory } from './useTaskCategory';

type useFilterSortTasksProps = {
  tasks: Task[];
  isCompletedHidden: boolean;
};

export function useFilterSortTasks({
  tasks,
  isCompletedHidden,
}: useFilterSortTasksProps) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('due-date');

  const { category, setCategory } = useTaskCategory();
  const { setFilteredTasksQuantity } = useFilteredTasksQuantity();

  const filterByCompleted = useCallback(
    (task: Task) => (isCompletedHidden ? task.status !== 'done' : task),
    [isCompletedHidden],
  );

  const filterByCategory = useCallback(
    (task: Task) => {
      if (category._id === 'all') return true;
      return category._id === task.category;
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

  const sortByDueDate = useCallback((a: Task, b: Task) => {
    const dateA = new Date(a.dueDate || 0);
    const dateB = new Date(b.dueDate || 0);
    return dateA.getTime() - dateB.getTime();
  }, []);

  const sortByPriority = useCallback((a: Task, b: Task) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }, []);

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

  useEffect(() => {
    setFilteredTasksQuantity(filteredSortedTasks.length);
  }, [filteredSortedTasks, setFilteredTasksQuantity]);

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
