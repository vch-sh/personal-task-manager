import { Info } from 'lucide-react';
import { settingsPageTips } from '@/lib/settingsPageTips';

export default function Tips() {
  return (
    <section>
      {settingsPageTips.map((tip) => (
        <p
          key={tip}
          className="text-default mt-2 flex gap-2 text-justify dark:text-dark"
        >
          <Info className="text-blue-500" />
          {tip}
        </p>
      ))}
    </section>
  );
}
