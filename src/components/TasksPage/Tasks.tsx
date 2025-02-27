'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { FolderOpen } from 'lucide-react';
import Categories from '@/components/TasksPage/Categories';
import FilterSortToggle from '@/components/TasksPage/FilterSortToggle';
import Filtering from '@/components/TasksPage/Filtering';
import HideCompleted from '@/components/TasksPage/HideCompleted';
import TaskActions from '@/components/TasksPage/TaskActions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { priorities, status } from '@/lib/table';
import { useFilterSortTasks } from '@/hooks/useFilterSortTasks';
import Settings from '@/types/Settings';
import Task from '@/types/Task';
import TaskCategory from '@/types/TaskCategory';

type TasksProps = {
  tasks: Task[];
  taskCategories: TaskCategory[];
  settings: Settings;
};

export default function Tasks({ tasks, taskCategories, settings }: TasksProps) {
  const [isCompletedHidden, setCompletedHidden] = useState(
    settings?.completedHidden ?? false,
  );
  const [isFilteringSortingOpen, setFilteringSortingOpen] = useState(
    settings?.isFilteringSortingOpen ?? false,
  );

  const {
    filteredSortedTasks,
    filter,
    sort,
    search,
    setSearch,
    setFilter,
    setSort,
  } = useFilterSortTasks({
    tasks,
    isCompletedHidden,
  });

  return (
    <>
      {!!tasks.length && (
        <FilterSortToggle
          isFilteringSortingOpen={isFilteringSortingOpen}
          setFilteringSortingOpen={setFilteringSortingOpen}
        >
          <Filtering
            tasksQuantity={tasks.length}
            filter={filter}
            sort={sort}
            search={search}
            setFilter={setFilter}
            setSort={setSort}
            setSearch={setSearch}
          />
          <HideCompleted
            isCompletedHidden={isCompletedHidden}
            setCompletedHidden={setCompletedHidden}
          />
          <Categories taskCategories={taskCategories} />
        </FilterSortToggle>
      )}

      {tasks.length > 0 && <hr className="dark:hidden" />}

      {filteredSortedTasks?.length === 0 ? (
        <p className="text-default mt-12 flex items-center justify-center gap-2 text-sm font-bold dark:text-neutral-200">
          <FolderOpen />
          Looks like your list is empty
        </p>
      ) : (
        <Table className="text-md text-center dark:text-neutral-50/90">
          <TableHeader>
            <TableRow className="">
              <TableHead className="rounded-bl-lg rounded-tl-lg">
                Text
              </TableHead>
              <TableHead className="w-4 px-2">Status</TableHead>
              <TableHead className="hidden w-4 px-2 sm:table-cell">
                Priority
              </TableHead>
              <TableHead className="hidden w-[90px] px-2 sm:table-cell">
                Due Date
              </TableHead>
              <TableHead className="w-4 rounded-br-lg rounded-tr-lg px-2">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSortedTasks?.map((task) => {
              const createdAt = task.createdAt
                ? format(new Date(task.createdAt), '[PP]')
                : '';
              const dayMonth = task.dueDate
                ? format(new Date(task.dueDate), 'LLL dd')
                : 'n/a';
              const year = task.dueDate
                ? format(new Date(task.dueDate), 'yyyy')
                : '';

              return (
                <TableRow
                  key={task._id}
                  className={`${task.status === 'done' && 'line-through'}`}
                >
                  <TableCell className="max-w-[100px] break-words rounded-bl-lg rounded-tl-lg text-justify sm:max-w-sm">
                    <time
                      dateTime={createdAt}
                      className="font-semibold dark:font-normal dark:text-dark"
                    >
                      {createdAt}
                    </time>
                    <p>{task.text}</p>
                  </TableCell>
                  <TableCell>{status[task.status]}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {priorities[task.priority]}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <p>{dayMonth}</p>
                    <p>{year}</p>
                  </TableCell>
                  <TableCell className="rounded-br-lg rounded-tr-lg px-2">
                    <TaskActions
                      taskId={task._id}
                      taskCategories={taskCategories}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
}
