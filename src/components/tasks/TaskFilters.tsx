import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTaskStore, FilterType } from '@/hooks/useTaskStore';
export function TaskFilters() {
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);
  return (
    <ToggleGroup
      type="single"
      value={filter}
      onValueChange={(value: FilterType) => {
        if (value) setFilter(value);
      }}
      className="w-full justify-center bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-lg"
    >
      <ToggleGroupItem value="all" aria-label="Show all tasks" className="flex-1 data-[state=on]:bg-white dark:data-[state=on]:bg-slate-900 data-[state=on]:shadow-sm data-[state=on]:text-indigo-500 font-semibold transition-all">
        All
      </ToggleGroupItem>
      <ToggleGroupItem value="active" aria-label="Show active tasks" className="flex-1 data-[state=on]:bg-white dark:data-[state=on]:bg-slate-900 data-[state=on]:shadow-sm data-[state=on]:text-indigo-500 font-semibold transition-all">
        Active
      </ToggleGroupItem>
      <ToggleGroupItem value="completed" aria-label="Show completed tasks" className="flex-1 data-[state=on]:bg-white dark:data-[state=on]:bg-slate-900 data-[state=on]:shadow-sm data-[state=on]:text-indigo-500 font-semibold transition-all">
        Completed
      </ToggleGroupItem>
    </ToggleGroup>
  );
}