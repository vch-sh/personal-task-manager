'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MoveLeft, Plus } from 'lucide-react';
import DialogCloseButton from '@/components/general/DialogCloseButton';
import LogoutButton from '@/components/general/LogOutButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useFilteredTasksQuantity } from '@/hooks/useFilteredTasksQuantity';
import TaskCategory from '@/types/TaskCategory';
import AddTask from './AddTask';

type HeaderProps = {
  taskCategories: TaskCategory[];
};

export default function Header({ taskCategories }: HeaderProps) {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const { filteredTasksQuantity } = useFilteredTasksQuantity();

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center mb-2">
        <h2 className="text-center sm:text-left text-3xl font-semibold tracking-tight sm:mr-auto mb-4 sm:mb-0">
          Tasks{' '}
          {!!filteredTasksQuantity && <span>({filteredTasksQuantity})</span>}
        </h2>

        <div className="flex items-center w-full sm:w-auto">
          <Link href="/dashboard" className="mr-2 w-full sm:w-auto">
            <Button className="px-3 sm:px-4 w-full">
              <MoveLeft />
              Dashboard
            </Button>
          </Link>

          <LogoutButton />
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Dialog open={addTaskModalOpen} onOpenChange={setAddTaskModalOpen}>
          <DialogTrigger asChild>
            <Button className="px-[11px] w-full mt-1 mb-2 sm:mt-0 sm:mb-0 sm:w-auto">
              <Plus />
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
            <AddTask
              taskCategories={taskCategories}
              handleDialogClose={() => setAddTaskModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
