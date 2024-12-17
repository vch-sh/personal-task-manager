'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

type TasksProgressProps = {
  tasksQuantity: number;
  completedTasksQuantity: number;
};

export default function TasksProgress({
  tasksQuantity,
  completedTasksQuantity,
}: TasksProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(completedTasksQuantity), 500);
    return () => clearTimeout(timer);
  }, [completedTasksQuantity]);

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Task Completion Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress
          className="transition-all"
          value={progress}
          max={tasksQuantity}
        />
        <p className="text-default mt-2 text-sm">
          {completedTasksQuantity} out of {tasksQuantity} tasks completed
        </p>
      </CardContent>
    </Card>
  );
}
