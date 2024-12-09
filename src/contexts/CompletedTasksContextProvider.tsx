'use client';

import { PropsWithChildren, useState } from 'react';
import CompletedTasksContext from './CompletedTasksContext';

export const CompletedTasksContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [isCompletedHidden, setCompletedHidden] = useState(false);

  return (
    <CompletedTasksContext.Provider
      value={{ isCompletedHidden, setCompletedHidden }}
    >
      {children}
    </CompletedTasksContext.Provider>
  );
};
