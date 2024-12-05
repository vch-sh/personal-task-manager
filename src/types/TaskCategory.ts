import { ObjectId } from 'mongodb';
import { colorVariants } from '@/lib/taskCategoriesColors';

type TaskCategory = {
  _id: ObjectId | 'all';
  name: string;
  color: keyof typeof colorVariants;
};

export default TaskCategory;
