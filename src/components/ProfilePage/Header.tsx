import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Profile Settings
      </h2>
      <Link href="/tasks">
        <Button className="transition-all active:scale-90">
          <MoveLeft />
          Tasks
        </Button>
      </Link>
    </header>
  );
}
