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
        <Card className="w-full mb-8">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="font-semibold">Tasks By Category</CardTitle>
          </CardHeader>
          <CardContent className="font-bold flex gap-2 flex-wrap">
            {tasksQuantityByCategory.map((task, index) => (
              <div
                key={`${task}_${index}`}
                className={`${colorVariants[task.color]} ${opacity === 100 ? 'opacity-100' : 'opacity-0'} transition mb-2 text-white p-2 rounded-md shadow-md`}
              >
                <p>
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
