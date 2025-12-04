import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTaskStore } from '@/hooks/useTaskStore';
import { TaskItem } from './TaskItem';
import { Skeleton } from '@/components/ui/skeleton';
import { Frown } from 'lucide-react';
export function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  const isLoading = useTaskStore((state) => state.isLoading);
  const filteredTasks = useMemo(() => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  }, [tasks, filter]);
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    );
  }
  if (filteredTasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center p-8 space-y-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg"
      >
        <Frown className="h-12 w-12 text-slate-400" />
        <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300">No tasks here!</h3>
        <p className="text-slate-500 dark:text-slate-400">
          {filter === 'all' ? "Add a task to get started." : `No ${filter} tasks found.`}
        </p>
      </motion.div>
    );
  }
  return (
    <motion.ul layout className="space-y-3">
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}