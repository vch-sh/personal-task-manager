import { Badge } from '@/components/ui/badge';
import { colorVariants } from '@/lib/taskCategoriesColors';
import { useTaskCategory } from '@/hooks/useTaskCategory';
import TaskCategory from '@/types/TaskCategory';
import AddEditCategoryDialog from './AddEditCategoryDialog';
import DeleteCategoryDialog from './DeleteCategoryDialog';

type CategoriesProps = {
  taskCategories: TaskCategory[];
};

export default function Categories({ taskCategories }: CategoriesProps) {
  const { category, setCategory } = useTaskCategory();

  return (
    <section className="flex flex-wrap items-center justify-normal gap-2 sm:gap-1">
      {taskCategories?.map((taskCategory) => (
        <Badge
          key={taskCategory._id}
          className={`${taskCategory.name.toLowerCase() === category.name.toLowerCase() && 'scale-105 underline underline-offset-2 transition-all'} ${colorVariants[taskCategory.color]} cursor-pointer px-3.5 py-1 text-[13px] font-normal text-white shadow-md sm:px-2.5 sm:py-0.5`}
          onClick={() =>
            setCategory({
              _id: taskCategory._id,
              name: taskCategory.name,
              color: taskCategory.color,
            })
          }
        >
          {taskCategory.name.toLowerCase()}
        </Badge>
      ))}
      <span className="mx-2 hidden h-6 w-0.5 bg-gray-300 sm:block"></span>
      <div className="flex items-center gap-5 sm:gap-3">
        <AddEditCategoryDialog label="Add" />
        {category.name !== 'all' && (
          <AddEditCategoryDialog label="Update" id={category._id} />
        )}
        {category.name !== 'all' && <DeleteCategoryDialog />}
      </div>
    </section>
  );
}
