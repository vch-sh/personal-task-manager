import { CheckCircle2, Circle, Clock, ListTodo } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type TaskStatisticsProps = {
  tasksQuantity: number;
  completedTasksQuantity: number;
  inProgressTasksQuantity: number;
  todoTasksQuantity: number;
};

export default function TaskStatistics({
  tasksQuantity,
  completedTasksQuantity,
  inProgressTasksQuantity,
  todoTasksQuantity,
}: TaskStatisticsProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="font-semibold text-lg">Total Tasks</CardTitle>
            <ListTodo className="h-5 w-5" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {tasksQuantity}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="font-semibold text-lg">Completed</CardTitle>
            <CheckCircle2 className="h-5 w-5" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {completedTasksQuantity}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="font-semibold text-lg">In Progress</CardTitle>
            <Clock className="h-5 w-5" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {inProgressTasksQuantity}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="font-semibold text-lg">To Do</CardTitle>
            <Circle className="h-5 w-5" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {todoTasksQuantity}
          </CardContent>
        </Card>
      </div>

      <Card className="my-4">
        <CardHeader>
          <CardTitle>Task Completion Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            className="transition-all"
            value={completedTasksQuantity}
            max={tasksQuantity}
          />
          <p className="text-default text-sm mt-2">
            {completedTasksQuantity} out of {tasksQuantity} tasks completed
          </p>
        </CardContent>
      </Card>
    </>
  );
}
