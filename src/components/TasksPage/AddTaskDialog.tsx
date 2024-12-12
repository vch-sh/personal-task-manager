import { useState } from 'react';
import { Plus } from 'lucide-react';
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
import AddTask from './AddTask';

type AddTaskDialogProps = { taskCategories: TaskCategory[] };

export default function AddTaskDialog({ taskCategories }: AddTaskDialogProps) {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

  return (
    <Dialog open={addTaskModalOpen} onOpenChange={setAddTaskModalOpen}>
      <DialogTrigger asChild className="active:scale-95">
        <Button size="sm">
          <Plus />
          <span>Add Task</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="relative">
          <DialogTitle className="text-left">Add New Task</DialogTitle>
          <DialogDescription></DialogDescription>
          <DialogCloseButton handleClose={() => setAddTaskModalOpen(false)} />
        </DialogHeader>
        <AddTask
          taskCategories={taskCategories}
          handleDialogClose={() => setAddTaskModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
