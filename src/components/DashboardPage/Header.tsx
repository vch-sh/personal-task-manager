import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
      <Link href="/tasks" prefetch={true}>
        <Button>
          Tasks
          <MoveRight />
        </Button>
      </Link>
    </div>
  );
}
