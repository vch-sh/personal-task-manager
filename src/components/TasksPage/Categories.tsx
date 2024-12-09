import { Badge } from '@/components/ui/badge';
import { colorVariants } from '@/lib/taskCategoriesColors';
import { useTaskCategory } from '@/hooks/useTaskCategory';
import TaskCategory from '@/types/TaskCategory';
import AddTaskCategoryDialog from './AddCategoryDialog';
import DeleteCategoryDialog from './DeleteCategoryDialog';

type CategoriesProps = {
  taskCategories: TaskCategory[];
};

export default function Categories({ taskCategories }: CategoriesProps) {
  const { category, setCategory } = useTaskCategory();

  return (
    <section className="flex flex-wrap justify-normal items-center gap-2 sm:gap-1">
      {taskCategories?.map((taskCategory) => (
        <Badge
          key={taskCategory._id.toString()}
          className={`${taskCategory.name === category.name && 'scale-105 underline underline-offset-2 transition-all'} ${colorVariants[taskCategory.color] || 'bg-gray-500 text-gray-900'} text-white cursor-pointer shadow-md px-3.5 py-1 sm:px-2.5 sm:py-0.5`}
          onClick={() =>
            setCategory({
              _id: taskCategory._id,
              name: taskCategory.name,
              color: taskCategory.color,
            })
          }
        >
          {taskCategory.name}
        </Badge>
      ))}
      <AddTaskCategoryDialog />
      {category.name !== 'all' && <DeleteCategoryDialog />}
    </section>
  );
}
