import { TriangleAlertIcon } from 'lucide-react';

type FormErrorProps = {
  error: string;
};

export default function FormError({ error }: FormErrorProps) {
  return (
    <div className="text-sm font-medium text-red-500 dark:text-red-900 flex items-center justify-center gap-2">
      <TriangleAlertIcon size={20} />
      <p>{error}</p>
    </div>
  );
}
