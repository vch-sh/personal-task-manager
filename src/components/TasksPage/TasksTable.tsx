import { format } from 'date-fns';
import { Pen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Task from '@/types/Task';

type TasksTableProps = {
  tasks: Task[];
};

export default function TasksTable({ tasks }: TasksTableProps) {
  return (
    <>
      {tasks.length === 0 ? (
        <p className="text-xs font-bold text-default text-center">
          No tasks were added
        </p>
      ) : (
        <Table className="text-center">
          <TableHeader>
            <TableRow>
              <TableHead>Text</TableHead>
              <TableHead className="w-28">Status</TableHead>
              <TableHead className="hidden sm:table-cell w-5">
                Priority
              </TableHead>
              <TableHead className="hidden sm:table-cell w-32">
                Due Date
              </TableHead>
              <TableHead className="w-10">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((task) => {
              const formattedDate = task.dueDate
                ? format(new Date(task.dueDate), 'PP')
                : 'n/a';

              return (
                <TableRow key={task._id.toString()}>
                  <TableCell className="max-w-[100px] sm:max-w-sm break-words text-left">
                    {task.text}
                  </TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {task.priority}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {formattedDate}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-not-allowed"
                    >
                      <Pen />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-not-allowed"
                    >
                      <Trash2 />
                    </Button>
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
