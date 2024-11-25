import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-semibold tracking-tight">Tasks</h2>
      <Button>
        <Plus className="mr-1" />
        <span>Add Task</span>
      </Button>
    </div>
  );
}
