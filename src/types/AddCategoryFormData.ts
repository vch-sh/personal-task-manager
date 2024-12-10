import { colorVariants } from '@/lib/taskCategoriesColors';

type AddCategoryFormData = {
  userId: string;
  name: string;
  color: keyof typeof colorVariants;
};

export default AddCategoryFormData;
