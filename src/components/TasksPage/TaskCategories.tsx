import { Dispatch, SetStateAction } from 'react';
import { Badge } from '@/components/ui/badge';
import { colorVariants } from '@/lib/taskCategoriesColors';
import TaskCategory from '@/types/TaskCategory';
import AddTaskCategoryDialog from './AddTaskCategoryDialog';
import DeleteTaskCategoryDialog from './DeleteTaskCategoryDialog';

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
    <section className="mb-6 flex flex-wrap justify-normal items-center gap-2 sm:gap-1">
      {taskCategories?.map((taskCategory) => (
        <Badge
          key={taskCategory._id.toString()}
          className={`${taskCategory.name === category.name && 'scale-105 underline underline-offset-2 transition-all'} ${colorVariants[taskCategory.color] || 'bg-gray-500 text-gray-900'} text-white cursor-pointer shadow-md px-3.5 py-1 sm:px-2.5 sm:py-0.5`}
          onClick={() =>
            setCategory({
              _id: taskCategory._id.toString(),
              name: taskCategory.name,
              color: taskCategory.color,
            })
          }
        >
          {taskCategory.name}
        </Badge>
      ))}
      <AddTaskCategoryDialog />
      {category.name !== 'all' && (
        <DeleteTaskCategoryDialog
          category={category}
          setCategory={setCategory}
        />
      )}
    </section>
  );
}
