import { CheckCircle2, Circle, Clock } from 'lucide-react';

export const status = {
  'to-do': <Circle size="21" className="opacity-60 block mx-auto" />,
  'in-progress': <Clock size="21" className="opacity-60 block mx-auto" />,
  done: <CheckCircle2 size="21" className="opacity-60 block mx-auto" />,
};

const priorities = {
  low: 'bg-green-500',
  medium: 'bg-orange-500/70',
  high: 'bg-red-500',
};

export function getPriority(priority: 'low' | 'medium' | 'high') {
  const bgClass = priorities[priority] || 'bg-gray-500';
  return <div className={`${bgClass} h-5 w-5 rounded-full shadow-sm`} />;
}
