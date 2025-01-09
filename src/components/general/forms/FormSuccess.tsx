import { CircleCheck } from 'lucide-react';

type FormSuccessProps = {
  success: string;
};

export default function FormSuccess({ success }: FormSuccessProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-500 dark:text-emerald-500">
      <CircleCheck size={22} />
      <p>{success}</p>
    </div>
  );
}
