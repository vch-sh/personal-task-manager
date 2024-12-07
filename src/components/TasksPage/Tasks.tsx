'use client';

import { format } from 'date-fns';
import { FolderOpen } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { priorities, status } from '@/lib/table';
import { useFilterSortTasks } from '@/hooks/useFilterSortTasks';
import Task from '@/types/Task';
import TaskCategory from '@/types/TaskCategory';
import Categories from './Categories';
import Filtering from './Filtering';
import TaskActions from './TaskActions';

type TasksProps = {
  tasks: Task[];
  taskCategories: TaskCategory[];
};

export default function Tasks({ tasks, taskCategories }: TasksProps) {
  const { filteredSortedTasks, setFilter, setSort } = useFilterSortTasks({
    tasks,
  });

  return (
    <>
      <Filtering
        tasksQuantity={tasks.length}
        setFilter={setFilter}
        setSort={setSort}
      />

      {!!tasks.length && <Categories taskCategories={taskCategories} />}

      {filteredSortedTasks.length === 0 ? (
        <p className="text-sm font-bold text-default flex items-center justify-center gap-2">
          <FolderOpen />
          Looks like your list is empty
        </p>
      ) : (
        <Table className="text-center mb-8">
          <TableHeader>
            <TableRow>
              <TableHead>Text</TableHead>
              <TableHead className="w-4 px-2">Status</TableHead>
              <TableHead className="hidden px-2 sm:table-cell w-4">
                Priority
              </TableHead>
              <TableHead className="hidden px-2 sm:table-cell w-[84px]">
                Due Date
              </TableHead>
              <TableHead className="w-4 px-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSortedTasks?.map((task) => {
              const createdAt = task.createdAt
                ? format(new Date(task.createdAt), '[PP]')
                : '';
              const dayMonth = task.dueDate
                ? format(new Date(task.dueDate), 'LLL dd')
                : 'n/a';
              const year = task.dueDate
                ? format(new Date(task.dueDate), 'yyyy')
                : '';

              return (
                <TableRow
                  key={task._id.toString()}
                  className={`${task.status === 'done' && 'line-through'}`}
                >
                  <TableCell
                    className={` max-w-[100px] sm:max-w-sm break-words text-justify`}
                  >
                    <time dateTime={createdAt} className="font-semibold">
                      {createdAt}
                    </time>
                    <p>{task.text}</p>
                  </TableCell>
                  <TableCell>{status[task.status]}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {priorities[task.priority]}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <p>{dayMonth}</p>
                    <p>{year}</p>
                  </TableCell>
                  <TableCell className="px-2">
                    <TaskActions
                      taskId={task._id.toString()}
                      taskCategories={taskCategories}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
}
