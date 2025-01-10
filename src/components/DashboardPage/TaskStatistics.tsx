import { CheckCircle2, Circle, Clock, ListTodo } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { colorVariants } from '@/lib/taskCategoriesColors';
import TasksProgress from './TasksProgress';
import TasksQuantityByCategory from './TasksQuantityByCategory';

type TaskStatisticsProps = {
  tasksQuantity: number;
  completedTasksQuantity: number;
  inProgressTasksQuantity: number;
  todoTasksQuantity: number;
  tasksQuantityByCategory: {
    category: string;
    color: keyof typeof colorVariants;
    count: number;
  }[];
};

export default function TaskStatistics({
  tasksQuantity,
  completedTasksQuantity,
  inProgressTasksQuantity,
  todoTasksQuantity,
  tasksQuantityByCategory,
}: TaskStatisticsProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-end justify-between gap-2">
            <CardTitle className="text-xl">Total Tasks</CardTitle>
            <ListTodo className="h-6 w-6" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {tasksQuantity}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-end justify-between gap-2">
            <CardTitle className="text-xl font-semibold">Completed</CardTitle>
            <CheckCircle2 className="h-6 w-6" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {completedTasksQuantity}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-end justify-between gap-2">
            <CardTitle className="text-xl font-semibold">In Progress</CardTitle>
            <Clock className="h-6 w-6" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {inProgressTasksQuantity}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-end justify-between gap-2">
            <CardTitle className="text-xl font-semibold">To Do</CardTitle>
            <Circle className="h-6 w-6" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {todoTasksQuantity}
          </CardContent>
        </Card>
      </div>

      <TasksProgress
        tasksQuantity={tasksQuantity}
        completedTasksQuantity={completedTasksQuantity}
      />

      <TasksQuantityByCategory
        tasksQuantityByCategory={tasksQuantityByCategory}
      />
    </>
  );
}
