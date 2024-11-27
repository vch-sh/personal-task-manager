import { CheckCircle2, Circle, Clock } from 'lucide-react';

export const status = {
  'to-do': <Circle size="21" className="opacity-60 block mx-auto" />,
  'in-progress': <Clock size="21" className="opacity-60 block mx-auto" />,
  done: <CheckCircle2 size="21" className="opacity-60 block mx-auto" />,
};

export const priority = {
  low: <div className="h-5 w-5 bg-green-500 rounded-full shadow-sm" />,
  medium: <div className="h-5 w-5 bg-orange-500/70 rounded-full shadow-sm" />,
  high: <div className="h-5 w-5 bg-red-500 rounded-full shadow-sm" />,
};
