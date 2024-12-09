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
      <AccordionItem value="toggle">
        <AccordionTrigger
          className={`${isShown && 'bg-indigo-50'} bg-indigo-50 justify-center gap-2 p-2 text-sm rounded-md my-2 hover:bg-indigo-100 sm:flex-initial sm:justify-start sm:bg-transparent`}
          onClick={() => setShown(!isShown)}
        >
          {isShown ? 'Hide Filters & Sorting' : 'Show Filters & Sorting'}
        </AccordionTrigger>
        <AccordionContent className="mx-1">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
