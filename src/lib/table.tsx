import { CheckCircle2, Circle, Clock, Scale, Turtle, Zap } from 'lucide-react';

export const status = {
  'to-do': <Circle size="21" className="opacity-70 block mx-auto" />,
  'in-progress': <Clock size="21" className="opacity-70 block mx-auto" />,
  done: <CheckCircle2 size="21" className="opacity-70 block mx-auto" />,
};

export const priorities = {
  low: <Turtle className="opacity-70 block mx-auto" />,
  medium: <Scale className="opacity-70 block mx-auto" />,
  high: <Zap className="opacity-70 block mx-auto" />,
};
