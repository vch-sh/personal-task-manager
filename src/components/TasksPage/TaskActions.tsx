import { useRef } from 'react';
import { Pen, Trash2 } from 'lucide-react';
import DialogCloseButton from '@/components/general/DialogCloseButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import TaskCategory from '@/types/TaskCategory';
import DeleteTaskForm from './DeleteTaskForm';
import EditTask from './EditTask';

type TaskActionsProps = {
  taskId: string;
  taskCategories: TaskCategory[];
};

export default function TaskActions({
  taskId,
  taskCategories,
}: TaskActionsProps) {
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Dialog>
        <DialogTrigger asChild ref={editButtonRef}>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 bg-neutral-900 p-2 hover:bg-neutral-900"
          >
            <Pen className="text-neutral-50" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="relative">
            <DialogTitle className="text-left">Update Task</DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogCloseButton
              handleClose={() => editButtonRef.current?.click()}
            />
          </DialogHeader>
          <EditTask
            taskId={taskId}
            taskCategories={taskCategories}
            handleDialogClose={() => editButtonRef.current?.click()}
          />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild ref={deleteButtonRef}>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 bg-neutral-900 p-2 hover:bg-neutral-900"
          >
            <Trash2 className="text-neutral-50" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="relative">
            <DialogTitle className="text-left">Delete this task?</DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogCloseButton
              handleClose={() => deleteButtonRef.current?.click()}
            />
          </DialogHeader>
          <DeleteTaskForm
            id={taskId}
            handleDialogClose={() => deleteButtonRef.current?.click()}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
