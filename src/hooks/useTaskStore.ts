import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Task } from '@shared/types';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
export type FilterType = 'all' | 'active' | 'completed';
type TaskState = {
  tasks: Task[];
  filter: FilterType;
  isLoading: boolean;
  error: string | null;
};
type TaskActions = {
  fetchTasks: () => Promise<void>;
  addTask: (text: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilter: (filter: FilterType) => void;
};
export const useTaskStore = create<TaskState & TaskActions>()(
  immer((set, get) => ({
    tasks: [],
    filter: 'all',
    isLoading: true,
    error: null,
    fetchTasks: async () => {
      set({ isLoading: true, error: null });
      try {
        const tasks = await api<Task[]>('/api/tasks');
        set({ tasks, isLoading: false });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tasks';
        set({ isLoading: false, error: errorMessage });
        toast.error(errorMessage);
      }
    },
    addTask: async (text: string) => {
      const optimisticTask: Task = {
        id: `temp-${Date.now()}`,
        text,
        completed: false,
        createdAt: Date.now(),
      };
      set((state) => {
        state.tasks.unshift(optimisticTask);
      });
      try {
        const newTask = await api<Task>('/api/tasks', {
          method: 'POST',
          body: JSON.stringify({ text }),
        });
        set((state) => {
          const taskIndex = state.tasks.findIndex((t) => t.id === optimisticTask.id);
          if (taskIndex !== -1) {
            state.tasks[taskIndex] = newTask;
          }
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add task';
        toast.error(errorMessage);
        set((state) => {
          state.tasks = state.tasks.filter((t) => t.id !== optimisticTask.id);
        });
      }
    },
    toggleTask: async (id: string) => {
      const originalTasks = get().tasks;
      const task = originalTasks.find((t) => t.id === id);
      if (!task) return;
      set((state) => {
        const taskToUpdate = state.tasks.find((t) => t.id === id);
        if (taskToUpdate) {
          taskToUpdate.completed = !taskToUpdate.completed;
        }
      });
      try {
        await api<Task>(`/api/tasks/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ completed: !task.completed }),
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
        toast.error(errorMessage);
        set({ tasks: originalTasks });
      }
    },
    deleteTask: async (id: string) => {
      const originalTasks = get().tasks;
      set((state) => {
        state.tasks = state.tasks.filter((t) => t.id !== id);
      });
      try {
        await api(`/api/tasks/${id}`, { method: 'DELETE' });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete task';
        toast.error(errorMessage);
        set({ tasks: originalTasks });
      }
    },
    setFilter: (filter: FilterType) => {
      set({ filter });
    },
  }))
);