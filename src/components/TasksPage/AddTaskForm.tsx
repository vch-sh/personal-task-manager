'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
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
import { addTask } from '@/actions/AddTask';
import AddEditTaskFormData from '@/types/AddEditFormData';
import FormStatusType from '@/types/FormStatus';
import TaskCategory from '@/types/TaskCategory';

type AddTaskFormProps = {
  taskCategories: TaskCategory[];
  handleDialogClose: () => void;
};

export default function AddTaskForm({
  taskCategories,
  handleDialogClose,
}: AddTaskFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});
  const [textLength, setTextLength] = useState(0);

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

  async function onSubmit(data: AddEditTaskFormData) {
    setFormStatus({});

    try {
      const response = await addTask(data);

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
                <Select defaultValue="to-do" onValueChange={field.onChange}>
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
                <Select defaultValue="medium" onValueChange={field.onChange}>
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
                <Select defaultValue="all" onValueChange={field.onChange}>
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
