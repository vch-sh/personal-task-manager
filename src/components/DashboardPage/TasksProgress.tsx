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
    <Card className="mt-4 mb-8">
      <CardHeader>
        <CardTitle>Task Completion Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress
          className="transition-all"
          value={progress}
          max={tasksQuantity}
        />
        <p className="text-default text-sm mt-2">
          {completedTasksQuantity} out of {tasksQuantity} tasks completed
        </p>
      </CardContent>
    </Card>
  );
}
