import { useState } from 'react';
import { FolderX, ShieldAlert } from 'lucide-react';
import 'lucide-react';
import DialogCloseButton from '@/components/general/DialogCloseButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTaskCategory } from '@/hooks/useTaskCategory';
import DeleteTaskCategoryForm from './DeleteCategoryForm';

export default function DeleteCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { category } = useTaskCategory();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <FolderX className="opacity-70" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="relative">
          <DialogTitle className="flex items-center justify-start gap-2 mb-3">
            Delete category{' '}
            <span
              className={`bg-${category.color}-500 text-white text-sm px-2.5 py-0.5 rounded-full bg-gray-500`}
            >
              {category.name}
            </span>{' '}
            ?
          </DialogTitle>
          <DialogDescription className="font-bold text-red-500 flex items-center gap-1">
            <ShieldAlert />
            All tasks in this category will be removed
          </DialogDescription>
          <DialogCloseButton handleClose={() => setIsOpen(false)} />
        </DialogHeader>
        <DeleteTaskCategoryForm handleDialogClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
