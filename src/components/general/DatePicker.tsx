'use client';

import * as React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type DatePickerProps = {
  id: string;
  field: ControllerRenderProps<any, 'dueDate'>;
};

export default function DatePicker({ id, field }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !field.value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon />
          {field.value ? (
            format(field.value, 'PPP')
          ) : (
            <span>Pick a Due Date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value || undefined}
          onSelect={field.onChange}
        />
      </PopoverContent>
    </Popover>
  );
}
