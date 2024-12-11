import { FormProvider, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { addCategory } from '@/actions/AddCategory';
import AddEditCategoryFormData from '@/types/AddEditCategoryFormData';
import AddEditCategoryForm from './AddEditCategoryForm';

type AddCategoryFormProps = {
  handleDialogClose: () => void;
};

export default function AddCategory({
  handleDialogClose,
}: AddCategoryFormProps) {
  const { data: session } = useSession();

  const formMethods = useForm<AddEditCategoryFormData>({
    defaultValues: {
      userId: session?.user.id,
      name: '',
      color: 'default',
    },
    mode: 'onChange',
  });

  return (
    <FormProvider {...formMethods}>
      <AddEditCategoryForm
        handleDialogClose={handleDialogClose}
        action={addCategory}
      />
    </FormProvider>
  );
}
