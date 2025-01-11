import Link from 'next/link';
import { Edit, UserIcon } from 'lucide-react';
import LogoutButton from '@/components/general/LogOutButton';
import UserImage from '@/components/general/UserImage';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import User from '@/types/User';

type UserMenuProps = {
  profileImageUrl?: string;
  user: User;
};

export default function UserMenu({ user }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="p-2 dark:hover:bg-transparent"
          size="icon"
          asChild
        >
          <UserIcon className="h-10 w-10 opacity-70 dark:text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-opacity-95">
        <DropdownMenuLabel className="p-0">
          <Link
            href="profile"
            className="flex h-16 items-center gap-3 rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-50/10"
          >
            <UserImage
              width={50}
              height={50}
              profileImageUrl={user.profileImage}
            />
            <span className="text-default font-normal dark:text-neutral-50">
              {user.email}
            </span>
            <Edit className="opacity-70" />
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-[1px]" />
        <DropdownMenuItem className="flex justify-center p-0">
          <Link href="/dashboard" className="w-full text-center">
            <Button variant="link">Dashboard</Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center p-0">
          <Link href="/settings" className="w-full text-center">
            <Button variant="link">Settings</Button>
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
