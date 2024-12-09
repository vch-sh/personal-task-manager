'use client';

import { PropsWithChildren, useState } from 'react';
import FilteredTasksQuantityContext from './FilteredTasksQuantityContext';

export const FilteredTasksQuantityContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [filteredTasksQuantity, setFilteredTasksQuantity] = useState(0);

  return (
    <FilteredTasksQuantityContext.Provider
      value={{ filteredTasksQuantity, setFilteredTasksQuantity }}
    >
      {children}
    </FilteredTasksQuantityContext.Provider>
  );
};
