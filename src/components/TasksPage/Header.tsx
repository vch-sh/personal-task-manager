'use client';

import TaskCategory from '@/types/TaskCategory';
import User from '@/types/User';
import AddTaskDialog from './AddTaskDialog';
import HeaderTitle from './HeaderTitle';
import UserMenu from './UserMenu';

type HeaderProps = {
  taskCategories: TaskCategory[];
  user: User;
};

export default function Header({ taskCategories, user }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <HeaderTitle />
      <div className="flex items-center gap-4">
        <AddTaskDialog taskCategories={taskCategories} />
        <UserMenu user={user} />
      </div>
    </header>
  );
}
