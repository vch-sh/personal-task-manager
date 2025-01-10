import { LoaderCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFormattedLabel } from '@/lib/helpers';

type SubmitButtonProps = {
  label: string;
  isSubmitting: boolean;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
};

export default function SubmitButton({
  label,
  variant = 'default',
  isSubmitting,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant={variant}
      className="w-full"
      disabled={isSubmitting}
    >
      {isSubmitting && <LoaderCircleIcon className="animate-spin" />}
      {isSubmitting ? getFormattedLabel(label) : label}
    </Button>
  );
}
