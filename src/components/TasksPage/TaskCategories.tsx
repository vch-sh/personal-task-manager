import { Dispatch, SetStateAction } from 'react';
import { Badge } from '@/components/ui/badge';
import { colorVariants } from '@/lib/taskCategoriesColors';
import TaskCategory from '@/types/TaskCategory';
import AddTaskCategoryDialog from './AddTaskCategoryDialog';

type TaskCategoriesProps = {
  taskCategories: TaskCategory[];
  category: {
    _id: string;
    name: string;
    color: string;
  };
  setCategory: Dispatch<
    SetStateAction<{
      _id: string;
      name: string;
      color: string;
    }>
  >;
};

export default function TaskCategories({
  taskCategories,
  category,
  setCategory,
}: TaskCategoriesProps) {
  return (
    <section className="mb-6 flex flex-wrap justify-normal gap-2 sm:gap-1">
      {taskCategories?.map((taskCategory) => (
        <Badge
          key={taskCategory._id.toString()}
          className={`${taskCategory.name === category.name && 'scale-105 underline underline-offset-2'} ${colorVariants[taskCategory.color] || 'bg-gray-500 text-gray-900'} text-white cursor-pointer shadow-md transition-all px-3.5 py-1 sm:px-2.5 sm:py-0.5`}
          onClick={() =>
            setCategory({
              _id: taskCategory._id.toString(),
              name: taskCategory.name,
              color: taskCategory.color,
            })
          }
        >
          {taskCategory.name.toLowerCase()}
        </Badge>
      ))}
      <AddTaskCategoryDialog />
    </section>
  );
}
