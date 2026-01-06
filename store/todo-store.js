import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTodoStore = create(
  devtools(
    (set, get) => ({
      todos: [],
      filter: "all",
      isLoading: false,

      setTodos: (todos) => set({ todos }),

      addTodo: (newTodo) =>
        set((state) => ({
          todos: [...state.todos, newTodo],
        })),

      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo._id === id ? { ...todo, ...updates } : todo
          ),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo._id !== id),
        })),

      setFilter: (filter) => set({ filter }),

      setLoading: (isLoading) => set({ isLoading }),

      completedCount: () => get().todos.filter((todo) => todo.completed).length,

      activeCount: () => get().todos.filter((todo) => !todo.completed).length,
    }),
    { name: "todoStore" }
  )
);
