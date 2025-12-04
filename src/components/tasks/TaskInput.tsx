import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTaskStore } from '@/hooks/useTaskStore';
export function TaskInput() {
  const [text, setText] = useState('');
  const addTask = useTaskStore((state) => state.addTask);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text.trim());
      setText('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 h-12 text-lg px-4 bg-slate-100/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-background"
      />
      <Button 
        type="submit" 
        className="h-12 w-12 bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg active:scale-95"
        aria-label="Add Task"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </form>
  );
}