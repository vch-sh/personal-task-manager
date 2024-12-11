'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { addTask } from '@/actions/AddTask';
import AddEditTaskFormData from '@/types/AddEditFormData';
import TaskCategory from '@/types/TaskCategory';
import AddEditTaskForm from './AddEditTaskForm';

type AddTaskProps = {
  taskCategories: TaskCategory[];
  handleDialogClose: () => void;
};

export default function AddTask({
  taskCategories,
  handleDialogClose,
}: AddTaskProps) {
  const { data: session } = useSession();

  const formMethods = useForm<AddEditTaskFormData>({
    defaultValues: {
      userId: session?.user.id,
      text: '',
      status: 'to-do',
      priority: 'medium',
      category: 'all',
      dueDate: null,
      createdAt: new Date(),
    },
    mode: 'onChange',
  });

  return (
    <FormProvider {...formMethods}>
      <AddEditTaskForm
        taskCategories={taskCategories}
        handleDialogClose={handleDialogClose}
        action={addTask}
      />
    </FormProvider>
  );
}
