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
import EditTaskForm from './EditTaskForm';

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
    <div className="flex flex-col sm:flex-row gap-2 ">
      <Dialog>
        <DialogTrigger asChild ref={editButtonRef}>
          <Button variant="outline" size="sm" className="p-2">
            <Pen />
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
          <EditTaskForm
            taskId={taskId}
            taskCategories={taskCategories}
            handleDialogClose={() => editButtonRef.current?.click()}
          />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild ref={deleteButtonRef}>
          <Button variant="outline" size="sm" className="p-2">
            <Trash2 />
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
