import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCompletedTasks } from '@/hooks/useCompletedTasks';

export default function HideCompleted() {
  const { setCompletedHidden } = useCompletedTasks();

  return (
    <div className="flex items-center mb-4 gap-1">
      <Input
        type="checkbox"
        id="hideCompleted"
        className="h-4 w-4"
        onChange={(e) => setCompletedHidden(e.target.checked)}
      />
      <Label htmlFor="hideCompleted">Hide completed</Label>
    </div>
  );
}
