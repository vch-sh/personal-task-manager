import { PropsWithChildren, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FilterSortToggle({ children }: PropsWithChildren) {
  const [isShown, setShown] = useState(false);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="toggle" className="my-4">
        <AccordionTrigger
          className={`${isShown && 'bg-indigo-50'} flex items-center justify-center gap-2 rounded-md bg-indigo-50 p-2 text-sm hover:bg-indigo-100 sm:mb-0 sm:flex-initial sm:justify-start`}
          onClick={() => setShown(!isShown)}
        >
          {isShown ? 'Hide Filters & Sorting' : 'Show Filters & Sorting'}
        </AccordionTrigger>
        <AccordionContent className="mx-2 mt-1">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
