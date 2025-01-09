import { Info } from 'lucide-react';
import { settingsPageTips } from '@/lib/settingsPageTips';

export default function Tips() {
  return (
    <section>
      {settingsPageTips.map((tip) => (
        <p
          key={tip}
          className="text-default dark:text-dark mt-2 flex gap-2 text-justify text-sm"
        >
          <Info size={22} className="text-blue-500" />
          {tip}
        </p>
      ))}
    </section>
  );
}
