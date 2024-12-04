import { useState } from 'react';
import TaskCategory from '@/types/TaskCategory';
import { Badge } from '../ui/badge';

type TaskCategoriesProps = {
  taskCategories: TaskCategory[];
};

export default function TaskCategories({
  taskCategories,
}: TaskCategoriesProps) {
  const [selectedTaskCategory, setSelectedTaskCategory] = useState({
    _id: 'all',
    name: 'all',
  });

  return (
    <section className="mb-2">
      {taskCategories?.map((taskCategory) => (
        <Badge
          key={taskCategory._id.toString()}
          className={`${taskCategory.name === selectedTaskCategory.name && 'bg-vivid-sky-blue text-gray-900'} cursor-pointer`}
          onClick={() =>
            setSelectedTaskCategory({
              _id: taskCategory._id.toString(),
              name: taskCategory.name,
            })
          }
        >
          {taskCategory.name}
        </Badge>
      ))}
    </section>
  );
}
