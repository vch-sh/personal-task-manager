import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DialogCloseButtonProps = {
  handleClose: () => void;
};

export default function DialogCloseButton({
  handleClose,
}: DialogCloseButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="absolute -right-2 -top-4"
      type="button"
      onClick={handleClose}
    >
      <X className="h-4 w-4" />
    </Button>
  );
}
