import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Edit, User } from 'lucide-react';
import LogoutButton from '@/components/general/LogOutButton';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DefaultUserImage from '@/assets/default-user-image.webp';

export default function UserMenu() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="p-2" size="icon" asChild>
          <User className="h-10 w-10 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="p-0">
          <Link
            href="profile"
            className="flex h-16 cursor-not-allowed items-center gap-3 rounded-md p-2 hover:bg-neutral-100"
            onClick={(e) => e.preventDefault()}
          >
            <Image
              src={session?.user.image ?? DefaultUserImage}
              alt="user image"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-default">{session?.user.email}</span>
            <Edit className="opacity-70" />
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-[1px]" />
        <DropdownMenuItem className="flex justify-center p-0">
          <Link href="/dashboard">
            <Button variant="link">Dashboard</Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center p-0">
          <Link
            href="/settings"
            className="cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
          >
            <Button variant="link" disabled>
              Settings
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-[1px]" />
        <DropdownMenuItem className="p-0">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
