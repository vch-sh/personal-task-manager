import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoaderCircleIcon } from 'lucide-react';
import FormStatus from '@/components/general/forms/FormStatus';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { deleteTask } from '@/actions/DeleteTask';
import FormStatusType from '@/types/FormStatus';

type DeleteTaskFormProps = {
  id: string;
  handleDialogClose: () => void;
};

export default function DeleteTaskForm({
  id,
  handleDialogClose,
}: DeleteTaskFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});
  const formMethods = useForm();

  async function onSubmit() {
    try {
      const response = await deleteTask(id);

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
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormStatus status={formStatus} />
        <Button
          type="submit"
          className="w-full font-semibold"
          disabled={formMethods.formState.isSubmitting}
        >
          {formMethods.formState.isSubmitting && (
            <LoaderCircleIcon className="animate-spin" />
          )}
          Delete Task
        </Button>
      </form>
    </Form>
  );
}
