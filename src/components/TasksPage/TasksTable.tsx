import { format } from 'date-fns';
import { Pen, Trash2 } from 'lucide-react';
import { FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { priorities, status } from '@/lib/table';
import Task from '@/types/Task';

type TasksTableProps = {
  tasks: Task[];
};

export default function TasksTable({ tasks }: TasksTableProps) {
  return (
    <>
      {tasks.length === 0 ? (
        <p className="text-xs font-bold text-default flex items-center justify-center gap-2">
          <FolderOpen />
          It's empty here, add some tasks
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
              <TableHead className="hidden px-2 sm:table-cell w-20">
                Due Date
              </TableHead>
              <TableHead className="w-4 px-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((task) => {
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
                    <div className="flex flex-col sm:flex-row gap-2 ">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-not-allowed p-2"
                      >
                        <Pen />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-not-allowed p-2"
                      >
                        <Trash2 />
                      </Button>
                    </div>
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
