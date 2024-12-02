import { useRef } from 'react';
import { Pen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EditTaskForm from './EditTaskForm';
import DialogCloseButton from '../general/DialogCloseButton';

type TaskActionsProps = {
  taskId: string;
};

export default function TaskActions({ taskId }: TaskActionsProps) {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex flex-col sm:flex-row gap-2 ">
      <Dialog>
        <DialogTrigger asChild ref={ref}>
          <Button variant="outline" size="sm" className="p-2">
            <Pen />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="relative">
            <DialogTitle className="text-left">Edit Task</DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogCloseButton handleClose={() => ref.current?.click()} />
          </DialogHeader>
          <EditTaskForm
            taskId={taskId}
            handleDialogClose={() => ref.current?.click()}
          />
        </DialogContent>
      </Dialog>

      <Button variant="outline" size="sm" className="cursor-not-allowed p-2">
        <Trash2 />
      </Button>
    </div>
  );
}
