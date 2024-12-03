import { LoaderCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFormattedLabel } from '@/lib/helpers';

type SubmitButtonProps = {
  label: string;
  isSubmitting: boolean;
};

export default function SubmitButton({
  label,
  isSubmitting,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="w-full font-semibold"
      disabled={isSubmitting}
    >
      {isSubmitting && <LoaderCircleIcon className="animate-spin" />}
      {isSubmitting ? getFormattedLabel(label) : label}
    </Button>
  );
}
