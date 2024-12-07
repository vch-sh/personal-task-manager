'use client';

import { Dispatch, SetStateAction, createContext } from 'react';
import TaskCategory from '@/types/TaskCategory';

type TaskCategoryContextType = {
  category: TaskCategory;
  setCategory: Dispatch<SetStateAction<TaskCategory>>;
};

const TaskCategoryContext = createContext<TaskCategoryContextType | null>(null);

export default TaskCategoryContext;
