import { colorVariants } from '@/lib/taskCategoriesColors';

type TaskCategory = {
  _id: string;
  name: string;
  color: keyof typeof colorVariants;
};

export default TaskCategory;
