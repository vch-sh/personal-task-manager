import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { colorVariants } from '@/lib/taskCategoriesColors';
import TaskCategory from '@/types/TaskCategory';
import AddTaskCategoryDialog from './AddTaskCategoryDialog';

type TaskCategoriesProps = {
  taskCategories: TaskCategory[];
};

export default function TaskCategories({
  taskCategories,
}: TaskCategoriesProps) {
  const [selectedTaskCategory, setSelectedTaskCategory] = useState({
    _id: 'all',
    name: 'all',
    color: '',
  });

  return (
    <section className="mb-2 flex gap-1">
      {taskCategories?.map((taskCategory) => (
        <Badge
          key={taskCategory._id.toString()}
          className={`${taskCategory.name === selectedTaskCategory.name && 'scale-105 underline underline-offset-2'} ${colorVariants[taskCategory.color] || 'bg-gray-500 text-gray-900'} text-white cursor-pointer shadow-md transition-all`}
          onClick={() =>
            setSelectedTaskCategory({
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
