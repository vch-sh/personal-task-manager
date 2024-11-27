'use client';

import { useState } from 'react';
import DialogCloseButton from '../general/DialogCloseButton';
import { Button } from '../ui/button';
import { Plus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddTaskForm from './AddTaskForm';

type HeaderProps = {
  tasksQuantity: number;
};

export default function Header({ tasksQuantity }: HeaderProps) {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-semibold tracking-tight">
        Tasks {!!tasksQuantity && <span>({tasksQuantity})</span>}
      </h2>

      <Dialog open={addTaskModalOpen} onOpenChange={setAddTaskModalOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-1" />
            <span>Add Task</span>
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="relative">
            <DialogTitle className="text-left">Add New Task</DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogCloseButton handleClose={() => setAddTaskModalOpen(false)} />
          </DialogHeader>
          <AddTaskForm handleDialogClose={() => setAddTaskModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
