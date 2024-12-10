import { useContext } from 'react';
import FilteredTasksQuantityContext from '@/contexts/FilteredTasksQuantityContext';

export function useFilteredTasksQuantity() {
  const context = useContext(FilteredTasksQuantityContext);

  if (!context) {
    throw new Error(
      'useFilteredTasksQuantity must be used within a FilteredTasksQuantityContextProvider',
    );
  }

  return context;
}
