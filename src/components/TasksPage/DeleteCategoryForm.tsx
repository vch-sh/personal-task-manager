import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormStatus from '@/components/general/forms/FormStatus';
import SubmitButton from '@/components/general/forms/SubmitButton';
import { Form } from '@/components/ui/form';
import { deleteCategory } from '@/actions/DeleteCategory';
import { useTaskCategory } from '@/hooks/useTaskCategory';
import FormStatusType from '@/types/FormStatus';

type DeleteCategoryFormProps = {
  handleDialogClose: () => void;
};

export default function DeleteCategoryForm({
  handleDialogClose,
}: DeleteCategoryFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatusType>({});
  const { category, setCategory } = useTaskCategory();

  const formMethods = useForm();

  async function onSubmit() {
    try {
      const response = await deleteCategory(category._id);

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
          color: 'black',
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
