import { useState } from 'react';
import { Pen, PlusCircle } from 'lucide-react';
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

type AddEditCategoryDialogProps = {
  label: string;
};

export default function AddEditCategoryDialog({
  label,
}: AddEditCategoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className="opacity-70 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {label === 'Add' ? <PlusCircle /> : <Pen />}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="relative">
          <DialogTitle className="text-left">{label} Task Category</DialogTitle>
          <DialogDescription></DialogDescription>
          <DialogCloseButton handleClose={() => setIsOpen(false)} />
        </DialogHeader>
        <AddCategoryForm handleDialogClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
