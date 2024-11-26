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
};

export default function Filtering({ tasksQuantity }: FilteringProps) {
  return (
    <>
      {!!tasksQuantity && (
        <div className="flex items-center justify-between gap-4 mb-4">
          <fieldset className="w-full">
            <Label htmlFor="filter" className="w-full">
              Filter by Status{' '}
            </Label>
            <Select defaultValue="all">
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

          <fieldset className="w-full hidden sm:block">
            <Label htmlFor="sort" className="w-full">
              Sort{' '}
            </Label>
            <Select defaultValue="due-date">
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
