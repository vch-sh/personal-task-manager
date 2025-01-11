import { useFilteredTasksQuantity } from '@/hooks/useFilteredTasksQuantity';

export default function HeaderTitle() {
  const { filteredTasksQuantity } = useFilteredTasksQuantity();

  return (
    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
      Tasks {!!filteredTasksQuantity && <span>: {filteredTasksQuantity}</span>}
    </h2>
  );
}
