'use client';

import { PropsWithChildren, useState } from 'react';
import TaskCategory from '@/types/TaskCategory';
import TaskCategoryContext from './TaskCategoryContext';

export const TaskCategoryContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [category, setCategory] = useState<TaskCategory>({
    _id: 'all',
    name: 'all',
    color: 'black',
  });

  return (
    <TaskCategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </TaskCategoryContext.Provider>
  );
};
