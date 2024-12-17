import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <>
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
      <p className="mt-4 text-sm font-bold text-red-500">
        Frontend part available. Backend functionality is still in development.
      </p>
    </>
  );
}
