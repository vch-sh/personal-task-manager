import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  username: string;
};

export default function Header({ username }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-semibold tracking-tight">{username}</h2>
      <Link href="/tasks">
        <Button>
          Tasks
          <MoveRight />
        </Button>
      </Link>
    </div>
  );
}
