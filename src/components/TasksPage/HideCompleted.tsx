import { Dispatch, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type HideCompletedProps = {
  isCompletedHidden: boolean;
  setCompletedHidden: Dispatch<SetStateAction<boolean>>;
};

export default function HideCompleted({
  isCompletedHidden,
  setCompletedHidden,
}: HideCompletedProps) {
  return (
    <div className="mb-4 flex items-center gap-1">
      <Input
        type="checkbox"
        id="hideCompleted"
        className="h-4 w-4"
        checked={isCompletedHidden}
        onChange={(e) => setCompletedHidden(e.target.checked)}
      />
      <Label htmlFor="hideCompleted" className="dark:text-neutral-50/90">
        Hide completed
      </Label>
    </div>
  );
}
