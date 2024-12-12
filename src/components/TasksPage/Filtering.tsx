import { Dispatch, SetStateAction } from 'react';
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
  setFilter: Dispatch<SetStateAction<string>>;
  setSort: Dispatch<SetStateAction<string>>;
};

export default function Filtering({
  tasksQuantity,
  filter,
  sort,
  setFilter,
  setSort,
}: FilteringProps) {
  return (
    <>
      {!!tasksQuantity && (
        <div className="mb-4 flex items-center justify-between gap-4">
          <fieldset className="w-full">
            <Label htmlFor="filter" className="w-full">
              Filter by Status{' '}
            </Label>
            <Select defaultValue={filter} onValueChange={setFilter}>
              <SelectTrigger id="filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="to-do">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </fieldset>

          <fieldset className="hidden w-full sm:block">
            <Label htmlFor="sort" className="w-full">
              Sort{' '}
            </Label>
            <Select defaultValue={sort} onValueChange={setSort}>
              <SelectTrigger id="sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="due-date">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </fieldset>
        </div>
      )}
    </>
  );
}
