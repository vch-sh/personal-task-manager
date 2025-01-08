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
          className={`${isFilteringSortingOpen && 'bg-indigo-50'} flex items-center justify-center gap-2 rounded-md bg-indigo-50 p-2 text-sm hover:bg-indigo-100 sm:mb-0 sm:flex-initial sm:justify-start`}
          onClick={() => setFilteringSortingOpen(!isFilteringSortingOpen)}
        >
          {isFilteringSortingOpen
            ? 'Hide Filters & Sorting'
            : 'Show Filters & Sorting'}
        </AccordionTrigger>
        <AccordionContent className="mx-2 mt-1">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
