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
    settings.completedHidden ?? false,
  );
  const [isFilteringSortingOpen, setFilteringSortingOpen] = useState(
    settings.isFilteringSortingOpen ?? false,
  );

  const { filteredSortedTasks, filter, sort, setFilter, setSort } =
    useFilterSortTasks({
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
            setFilter={setFilter}
            setSort={setSort}
          />
          <HideCompleted
            isCompletedHidden={isCompletedHidden}
            setCompletedHidden={setCompletedHidden}
          />
          <Categories taskCategories={taskCategories} />
        </FilterSortToggle>
      )}

      {filteredSortedTasks?.length === 0 ? (
        <p className="text-default mt-12 flex items-center justify-center gap-2 text-sm font-bold">
          <FolderOpen />
          Looks like your list is empty
        </p>
      ) : (
        <Table className="text-center">
          <TableHeader>
            <TableRow>
              <TableHead>Text</TableHead>
              <TableHead className="w-4 px-2">Status</TableHead>
              <TableHead className="hidden w-4 px-2 sm:table-cell">
                Priority
              </TableHead>
              <TableHead className="hidden w-[84px] px-2 sm:table-cell">
                Due Date
              </TableHead>
              <TableHead className="w-4 px-2">Actions</TableHead>
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
                  <TableCell
                    className={`max-w-[100px] break-words text-justify sm:max-w-sm`}
                  >
                    <time dateTime={createdAt} className="font-semibold">
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
                  <TableCell className="px-2">
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
