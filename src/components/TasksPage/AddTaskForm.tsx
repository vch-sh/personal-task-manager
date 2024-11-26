'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { LoaderCircleIcon } from 'lucide-react';
import DatePicker from '@/components/general/DatePicker';
import FormStatus from '@/components/general/forms/FormStatus';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addTask } from '@/actions/AddTask';
import AddTaskFormData from '@/types/AddTaskFormData';
import FormStatusType from '@/types/FormStatus';

type AddTaskFormProps = {
  handleDialogClose: () => void;
};

export default function AddTaskForm({ handleDialogClose }: AddTaskFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});
  const [textLength, setTextLength] = useState(0);

  const { data: session } = useSession();

  const formMethods = useForm<AddTaskFormData>({
    defaultValues: {
      userId: session?.user.id,
      text: '',
      status: 'to-do',
      priority: 'medium',
      dueDate: null,
    },
    mode: 'onChange',
  });

  async function onSubmit(data: AddTaskFormData) {
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
            maxLength: { value: 150, message: 'Maximum 150 characters' },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="text" className="flex items-center">
                <span>Text</span>
                {textLength >= 100 && (
                  <span className="text-xs ml-auto">
                    {formMethods.watch('text').length}/150
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  id="text"
                  placeholder="Enter your task..."
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
              <FormLabel htmlFor="status">Status</FormLabel>
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
              <FormLabel htmlFor="priority">Priority</FormLabel>
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

        <Button
          type="submit"
          className="w-full font-semibold"
          disabled={formMethods.formState.isSubmitting}
        >
          {formMethods.formState.isSubmitting && (
            <LoaderCircleIcon className="animate-spin" />
          )}
          Add Task
        </Button>
      </form>
    </Form>
  );
}
