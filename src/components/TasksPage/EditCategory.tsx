import { FormProvider, useForm } from 'react-hook-form';
import { editCategory } from '@/actions/EditCategory';
import { getCategoryById } from '@/actions/GetCategoryById';
import AddEditCategoryFormData from '@/types/AddEditCategoryFormData';
import AddEditCategoryForm from './AddEditCategoryForm';

type EditCategoryProps = { id: string; handleDialogClose: () => void };

const defaultFormValues = async (
  id: string,
): Promise<AddEditCategoryFormData> => {
  const response = await getCategoryById(id);

  return {
    _id: response._id,
    userId: response.userId,
    name: response.name,
    color: response.color,
  };
};

export default function EditCategory({
  id,
  handleDialogClose,
}: EditCategoryProps) {
  const formMethods = useForm<AddEditCategoryFormData>({
    defaultValues: async () => await defaultFormValues(id),
    mode: 'onChange',
  });

  return (
    <FormProvider {...formMethods}>
      <AddEditCategoryForm
        handleDialogClose={handleDialogClose}
        action={editCategory}
      />
    </FormProvider>
  );
}
