import { LoaderCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      {isSubmitting ? `${label}ing...` : label}
    </Button>
  );
}
