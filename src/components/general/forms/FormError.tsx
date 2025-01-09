import { TriangleAlertIcon } from 'lucide-react';

type FormErrorProps = {
  error: string;
};

export default function FormError({ error }: FormErrorProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm font-medium text-red-500 dark:text-red-500">
      <TriangleAlertIcon size={20} />
      <p>{error}</p>
    </div>
  );
}
