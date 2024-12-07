import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import DialogCloseButton from '@/components/general/DialogCloseButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddCategoryForm from './AddCategoryForm';

export default function AddCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <PlusCircle
          className="opacity-70 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="relative">
          <DialogTitle className="text-left">Add New Task Category</DialogTitle>
          <DialogDescription></DialogDescription>
          <DialogCloseButton handleClose={() => setIsOpen(false)} />
        </DialogHeader>
        <AddCategoryForm handleDialogClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
