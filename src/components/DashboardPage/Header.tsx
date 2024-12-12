import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  username: string;
};

export default function Header({ username }: HeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {username}
      </h2>
      <Link href="/tasks">
        <Button className="transition-all active:scale-90">
          Tasks
          <MoveRight />
        </Button>
      </Link>
    </div>
  );
}
