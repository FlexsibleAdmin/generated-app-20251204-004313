import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Task } from '@shared/types';
import { useTaskStore } from '@/hooks/useTaskStore';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
interface TaskItemProps {
  task: Task;
}
export function TaskItem({ task }: TaskItemProps) {
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group flex items-center p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => toggleTask(task.id)}
        className="h-6 w-6 rounded-full data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
      />
      <label
        htmlFor={`task-${task.id}`}
        className={cn(
          'flex-1 ml-4 text-lg text-slate-800 dark:text-slate-200 transition-all duration-300 cursor-pointer',
          task.completed && 'line-through text-slate-400 dark:text-slate-500'
        )}
      >
        {task.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTask(task.id)}
        className="h-9 w-9 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-500"
        aria-label="Delete task"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </motion.li>
  );
}