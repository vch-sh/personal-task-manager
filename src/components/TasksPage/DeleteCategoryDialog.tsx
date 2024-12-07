import { Dispatch, SetStateAction, useState } from 'react';
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
import DeleteTaskCategoryForm from './DeleteCategoryForm';

type DeleteCategoryDialogProps = {
  category: {
    _id: string;
    name: string;
    color: string;
  };
  setCategory: Dispatch<
    SetStateAction<{
      _id: string;
      name: string;
      color: string;
    }>
  >;
};

export default function DeleteCategoryDialog({
  category,
  setCategory,
}: DeleteCategoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

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
        <DeleteTaskCategoryForm
          id={category._id}
          handleDialogClose={() => setIsOpen(false)}
          setCategory={setCategory}
        />
      </DialogContent>
    </Dialog>
  );
}
