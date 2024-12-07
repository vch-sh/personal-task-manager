import { FormProvider, useForm } from 'react-hook-form';
import { editTask } from '@/actions/EditTask';
import { getTaskById } from '@/actions/GetTaskById';
import AddEditTaskFormData from '@/types/AddEditFormData';
import TaskCategory from '@/types/TaskCategory';
import AddEditTaskForm from './AddEditTaskForm';

type EditTaskFormProps = {
  taskId: string | undefined;
  taskCategories: TaskCategory[];
  handleDialogClose: () => void;
};

const defaultEditFormValues = async (
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
}: EditTaskFormProps) {
  const formMethods = useForm<AddEditTaskFormData>({
    defaultValues: async () => await defaultEditFormValues(taskId),
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
