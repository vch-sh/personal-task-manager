import { CircleCheck } from 'lucide-react';

type FormSuccessProps = {
  success: string;
};

export default function FormSuccess({ success }: FormSuccessProps) {
  return (
    <div className="text-sm font-medium text-emerald-500 dark:text-emerald-900 flex items-center justify-center gap-2">
      <CircleCheck size={22} />
      <p>{success}</p>
    </div>
  );
}
