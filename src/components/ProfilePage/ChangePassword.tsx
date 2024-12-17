import { useState } from 'react';
import DialogCloseButton from '@/components/general/DialogCloseButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ChangePasswordForm from './ChangePasswordForm';

export default function ChangePassword() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-fit" type="button">
        <p className="text-default text-left text-sm hover:underline">
          Change password
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="relative text-left">
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Update your account password</DialogDescription>
          <DialogCloseButton handleClose={() => setIsOpen(false)} />
        </DialogHeader>
        <ChangePasswordForm />
      </DialogContent>
    </Dialog>
  );
}
