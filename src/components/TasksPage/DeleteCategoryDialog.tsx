import { useState } from 'react';
import { FolderX, ShieldAlert } from 'lucide-react';
import DialogCloseButton from '@/components/general/DialogCloseButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { colorVariants } from '@/lib/taskCategoriesColors';
import { useTaskCategory } from '@/hooks/useTaskCategory';
import DeleteTaskCategoryForm from './DeleteCategoryForm';

export default function DeleteCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { category } = useTaskCategory();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <FolderX className="opacity-70 dark:text-white" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="relative">
          <DialogTitle className="mb-3 flex items-center justify-start gap-2">
            Delete category{' '}
            <span
              className={`${colorVariants[category.color]} rounded-full bg-gray-500 px-2.5 py-0.5 text-sm text-white`}
            >
              {category.name.toLowerCase()}
            </span>{' '}
            ?
          </DialogTitle>
          <DialogDescription className="flex items-center gap-1 font-bold text-red-500">
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
