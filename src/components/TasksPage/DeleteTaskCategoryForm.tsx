import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormStatus from '@/components/general/forms/FormStatus';
import SubmitButton from '@/components/general/forms/SubmitButton';
import { Form } from '@/components/ui/form';
import { deleteTaskCategory } from '@/actions/DeleteTaskCategory';
import FormStatusType from '@/types/FormStatus';

type DeleteTaskCategoryFormProps = {
  id: string;
  handleDialogClose: () => void;
  setCategory: Dispatch<
    SetStateAction<{
      _id: string;
      name: string;
      color: string;
    }>
  >;
};

export default function DeleteTaskCategoryForm({
  id,
  handleDialogClose,
  setCategory,
}: DeleteTaskCategoryFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});

  const formMethods = useForm();

  async function onSubmit() {
    try {
      const response = await deleteTaskCategory(id);

      if (response?.error) {
        setFormStatus({ error: response.error });
        return;
      }
      if (response?.success) {
        setFormStatus({ success: response.success });
        handleDialogClose();
        setCategory({
          _id: 'all',
          name: 'all',
          color: '',
        });
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
        <SubmitButton
          label="Delete"
          isSubmitting={formMethods.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
