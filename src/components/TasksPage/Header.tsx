'use client';

import TaskCategory from '@/types/TaskCategory';
import AddTaskDialog from './AddTaskDialog';
import HeaderTitle from './HeaderTitle';
import UserMenu from './UserMenu';

type HeaderProps = {
  taskCategories: TaskCategory[];
  profileImageUrl?: string;
};

export default function Header({
  taskCategories,
  profileImageUrl,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <HeaderTitle />
      <div className="flex items-center gap-4">
        <AddTaskDialog taskCategories={taskCategories} />
        <UserMenu profileImageUrl={profileImageUrl} />
      </div>
    </header>
  );
}
