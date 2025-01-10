'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { colorVariants } from '@/lib/taskCategoriesColors';

type TasksQuantityByCategoryProps = {
  tasksQuantityByCategory: {
    category: string;
    color: keyof typeof colorVariants;
    count: number;
  }[];
};

export default function TasksQuantityByCategory({
  tasksQuantityByCategory,
}: TasksQuantityByCategoryProps) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(100), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {tasksQuantityByCategory.length > 0 && (
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="font-semibold">Tasks By Category</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 font-bold">
            {tasksQuantityByCategory.map((task, index) => (
              <div
                key={`${task}_${index}`}
                className={`${colorVariants[task.color]} ${opacity === 100 ? 'opacity-100' : 'opacity-0'} mb-2 rounded-md p-2 shadow-md transition`}
              >
                <p className="font-normal text-white">
                  {task.category} {task.count}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
