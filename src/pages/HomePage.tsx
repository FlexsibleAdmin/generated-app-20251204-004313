import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { useTaskStore } from '@/hooks/useTaskStore';
import { TaskInput } from '@/components/tasks/TaskInput';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskList } from '@/components/tasks/TaskList';
export function HomePage() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  return (
    <>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 opacity-50"></div>
        <div className="relative flex flex-col items-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-2xl mx-auto space-y-8 py-12">
            <header className="text-center space-y-2 animate-fade-in">
              <h1 className="text-5xl font-bold tracking-tighter text-indigo-600 dark:text-indigo-400">
                TaskFlow
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                A minimalist to-do list for clarity and focus.
              </p>
            </header>
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <TaskInput />
              <TaskFilters />
              <TaskList />
            </div>
            <footer className="text-center text-slate-500 dark:text-slate-400 pt-8">
              <p>Built with ❤��� on Cloudflare</p>
            </footer>
          </div>
        </div>
      </main>
      <Toaster richColors position="bottom-right" />
    </>
  );
}