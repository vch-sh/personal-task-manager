import { CheckCircle2, Circle, Clock } from 'lucide-react';

export const status = {
  'to-do': <Circle size="21" className="mx-auto block opacity-70" />,
  'in-progress': <Clock size="21" className="mx-auto block opacity-70" />,
  done: <CheckCircle2 size="21" className="mx-auto block opacity-70" />,
};

export const priorities = {
  low: (
    <div className="mx-auto h-5 w-5 rounded-full bg-emerald-500 shadow-md"></div>
  ),
  medium: (
    <div className="mx-auto h-5 w-5 rounded-full bg-orange-500 shadow-md"></div>
  ),
  high: (
    <div className="mx-auto h-5 w-5 rounded-full bg-red-600 shadow-md"></div>
  ),
};
