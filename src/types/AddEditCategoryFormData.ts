import { colorVariants } from '@/lib/taskCategoriesColors';

type AddEditCategoryFormData = {
  _id: string;
  userId: string;
  name: string;
  color: keyof typeof colorVariants;
};

export default AddEditCategoryFormData;
