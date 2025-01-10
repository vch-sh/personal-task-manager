import { TriangleAlertIcon } from 'lucide-react';

type FormErrorProps = {
  error: string;
};

export default function FormError({ error }: FormErrorProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-red-500 dark:font-medium">
      <TriangleAlertIcon size={20} />
      <p>{error}</p>
    </div>
  );
}
