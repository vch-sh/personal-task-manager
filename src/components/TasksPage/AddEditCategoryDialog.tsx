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
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';

type AddEditCategoryDialogProps = {
  label: string;
  id?: string;
};

export default function AddEditCategoryDialog({
  label,
  id,
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
        {label === 'Add' ? (
          <AddCategory handleDialogClose={() => setIsOpen(false)} />
        ) : (
          <EditCategory
            handleDialogClose={() => setIsOpen(false)}
            id={id || ''}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
