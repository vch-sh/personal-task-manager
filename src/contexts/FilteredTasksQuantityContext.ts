'use client';

import { Dispatch, SetStateAction, createContext } from 'react';

type FilteredTasksQuantityContextType = {
  filteredTasksQuantity: number;
  setFilteredTasksQuantity: Dispatch<SetStateAction<number>>;
};

const FilteredTasksQuantityContext =
  createContext<FilteredTasksQuantityContextType | null>(null);

export default FilteredTasksQuantityContext;
