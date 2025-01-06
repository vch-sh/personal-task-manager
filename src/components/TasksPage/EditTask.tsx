import { FormProvider, useForm } from 'react-hook-form';
import { editTask } from '@/actions/EditTask';
import { getTaskById } from '@/lib/tasks';
import AddEditTaskFormData from '@/types/AddEditFormData';
import TaskCategory from '@/types/TaskCategory';
import AddEditTaskForm from './AddEditTaskForm';

type EditTaskProps = {
  taskId: string | undefined;
  taskCategories: TaskCategory[];
  handleDialogClose: () => void;
};

const defaultFormValues = async (
  taskId: string | undefined,
): Promise<AddEditTaskFormData> => {
  const response = await getTaskById(taskId || '');

  return {
    text: response.text,
    status: response.status,
    priority: response.priority,
    category: response.category,
    dueDate: response.dueDate || null,
    editedAt: new Date(),
  };
};

export default function EditTaskForm({
  taskId,
  taskCategories,
  handleDialogClose,
}: EditTaskProps) {
  const formMethods = useForm<AddEditTaskFormData>({
    defaultValues: async () => await defaultFormValues(taskId),
    mode: 'onChange',
  });

  return (
    <FormProvider {...formMethods}>
      <AddEditTaskForm
        taskId={taskId}
        taskCategories={taskCategories}
        handleDialogClose={handleDialogClose}
        action={editTask}
      />
    </FormProvider>
  );
}
