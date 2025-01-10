import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type FilterSortToggleProps = {
  isFilteringSortingOpen: boolean;
  setFilteringSortingOpen: Dispatch<SetStateAction<boolean>>;
} & PropsWithChildren;

export default function FilterSortToggle({
  isFilteringSortingOpen,
  setFilteringSortingOpen,
  children,
}: FilterSortToggleProps) {
  return (
    <Accordion
      value={isFilteringSortingOpen ? 'open' : ''}
      type="single"
      collapsible
    >
      <AccordionItem value="open" className="my-4">
        <AccordionTrigger
          className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 sm:mb-0 sm:flex-initial sm:justify-start dark:bg-indigo-300 dark:bg-opacity-70 dark:text-slate-800 dark:hover:bg-indigo-300/90`}
          onClick={() => setFilteringSortingOpen(!isFilteringSortingOpen)}
        >
          {isFilteringSortingOpen
            ? 'Hide Filters & Sorting'
            : 'Show Filters & Sorting'}
        </AccordionTrigger>
        <AccordionContent className="mt-1 rounded-lg p-2">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
