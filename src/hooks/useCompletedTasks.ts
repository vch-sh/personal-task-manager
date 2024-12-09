import { useContext } from 'react';
import CompletedTasksContext from '@/contexts/CompletedTasksContext';

export function useCompletedTasks() {
  const context = useContext(CompletedTasksContext);

  if (!context) {
    throw new Error(
      'useCompletedTasks must be used within a CompletedTasksContextProvider',
    );
  }

  return context;
}
