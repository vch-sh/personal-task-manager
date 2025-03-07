import { Dispatch, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FilteringProps = {
  tasksQuantity: number;
  filter: string;
  sort: string;
  search: string;
  setFilter: Dispatch<SetStateAction<string>>;
  setSort: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
};

export default function Filtering({
  tasksQuantity,
  filter,
  sort,
  search,
  setFilter,
  setSort,
  setSearch,
}: FilteringProps) {
  return (
    <>
      {!!tasksQuantity && (
        <>
          <div className="mb-2 flex items-center justify-between gap-4">
            <fieldset className="w-full">
              <Label
                htmlFor="filter"
                className="w-full dark:text-neutral-50/90"
              >
                Filter by Status{' '}
              </Label>
              <Select defaultValue={filter} onValueChange={setFilter}>
                <SelectTrigger
                  id="filter"
                  className="border-2 bg-opacity-50 dark:bg-opacity-45 dark:text-neutral-50/90"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:text-neutral-50/90">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="to-do">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </fieldset>

            <fieldset className="hidden w-full sm:block">
              <Label htmlFor="sort" className="w-full dark:text-neutral-50/90">
                Sort{' '}
              </Label>
              <Select defaultValue={sort} onValueChange={setSort}>
                <SelectTrigger
                  id="sort"
                  className="border-2 bg-opacity-50 dark:bg-opacity-45 dark:text-neutral-50/90"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:text-neutral-50/90">
                  <SelectItem value="due-date">Due Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
            </fieldset>
          </div>
          <fieldset className="mb-4 hidden w-full sm:block">
            <Label htmlFor="search" className="w-full dark:text-neutral-50/90">
              Search by text
            </Label>
            <Input
              id="search"
              type="search"
              className="border-2 bg-opacity-50 dark:bg-opacity-45 dark:text-neutral-50/90"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </fieldset>
        </>
      )}
    </>
  );
}
