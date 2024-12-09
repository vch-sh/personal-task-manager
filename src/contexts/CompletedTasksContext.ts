'use client';

import { Dispatch, SetStateAction, createContext } from 'react';

type CompletedTasksContextType = {
  isCompletedHidden: boolean;
  setCompletedHidden: Dispatch<SetStateAction<boolean>>;
};

const CompletedTasksContext = createContext<CompletedTasksContextType | null>(
  null,
);

export default CompletedTasksContext;
