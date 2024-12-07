import { useContext } from 'react';
import TaskCategoryContext from '@/contexts/TaskCategoryContext';

export function useTaskCategory() {
  const context = useContext(TaskCategoryContext);

  if (!context) {
    throw new Error(
      'useTaskCategory must be used within a TaskCategoryProvider',
    );
  }

  return context;
}
