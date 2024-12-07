import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import DatePicker from '@/components/general/DatePicker';
import FormStatus from '@/components/general/forms/FormStatus';
import SubmitButton from '@/components/general/forms/SubmitButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AddEditTaskFormData from '@/types/AddEditFormData';
import FormStatusType from '@/types/FormStatus';
import TaskCategory from '@/types/TaskCategory';

type AddEditTaskFormProps = {
  taskId?: string;
  taskCategories: TaskCategory[];
  handleDialogClose: () => void;
  action: (
    data: AddEditTaskFormData,
    taskId?: string,
  ) => Promise<
    | {
        error: string;
        success?: undefined;
        taskId?: undefined;
      }
    | {
        success: string;
        taskId: string | undefined;
        error?: undefined;
      }
  >;
};

export default function AddEditTaskForm({
  taskId,
  taskCategories,
  handleDialogClose,
  action,
}: AddEditTaskFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});
  const [textLength, setTextLength] = useState(0);

  const formMethods = useFormContext<AddEditTaskFormData>();

  async function onSubmit(data: AddEditTaskFormData) {
    setFormStatus({});

    try {
      const response = await action(data, taskId);

      if (response?.error) {
        setFormStatus({ error: response.error });
        return;
      }

      if (response?.success) {
        setFormStatus({ success: response.success });
        handleDialogClose();
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        setFormStatus({ error: 'Something went wrong' });
      } else {
        setFormStatus({ error: 'Unknown error occurred. Please try later.' });
      }
    }
  }

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={formMethods.control}
          name="text"
          rules={{
            required: 'Required field',
            maxLength: { value: 200, message: 'Maximum 200 characters' },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="text" className="flex items-center">
                <span>Text</span>
                {textLength >= 150 && (
                  <span className="text-xs ml-auto">
                    {formMethods.watch('text').length}/200
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Textarea
                  id="text"
                  placeholder="Enter your task..."
                  className="h-40 sm:h-28"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setTextLength(e.target.value.length);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="status" className="block">
                Status
              </FormLabel>
              <FormControl>
                <Select
                  defaultValue={taskId ? field.value : 'to-do'}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="to-do">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="priority" className="block">
                Priority
              </FormLabel>
              <FormControl>
                <Select
                  defaultValue={taskId ? field.value : 'medium'}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="category" className="block">
                Category
              </FormLabel>
              <FormControl>
                <Select
                  defaultValue={taskId ? field.value : 'all'}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {taskCategories.map((taskCategory) => (
                      <SelectItem
                        key={taskCategory._id.toString()}
                        value={taskCategory._id.toString()}
                      >
                        {taskCategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor="dueDate">Due Date</FormLabel>
              <FormControl>
                <DatePicker id="dueDate" field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormStatus status={formStatus} />
        <SubmitButton
          label="Add"
          isSubmitting={formMethods.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
