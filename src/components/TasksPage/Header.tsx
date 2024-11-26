'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddTaskForm from './AddTaskForm';

export default function Header() {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-semibold tracking-tight">Tasks</h2>

      <Dialog open={addTaskModalOpen} onOpenChange={setAddTaskModalOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-1" />
            <span>Add Task</span>
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <AddTaskForm handleDialogClose={() => setAddTaskModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
