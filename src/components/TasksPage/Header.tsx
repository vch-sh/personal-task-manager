'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MoveLeft, Plus } from 'lucide-react';
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
import AddTaskForm from './AddTaskForm';

type HeaderProps = {
  tasksQuantity: number;
};

export default function Header({ tasksQuantity }: HeaderProps) {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

  return (
    <div className="flex items-center mb-8">
      <h2 className="text-3xl font-semibold tracking-tight">
        Tasks {!!tasksQuantity && <span>({tasksQuantity})</span>}
      </h2>

      <div className="ml-auto flex gap-4 items-center">
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
              <DialogCloseButton
                handleClose={() => setAddTaskModalOpen(false)}
              />
            </DialogHeader>
            <AddTaskForm handleDialogClose={() => setAddTaskModalOpen(false)} />
          </DialogContent>
        </Dialog>

        <hr className="w-0.5 h-10 inline-block bg-black/30" />

        <Link href="/dashboard">
          <Button>
            <MoveLeft />
            Go To Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
