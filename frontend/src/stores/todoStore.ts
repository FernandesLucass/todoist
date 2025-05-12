import { writable } from 'svelte/store';
import type { Todo } from '../types/todo';

export const todoStore = writable<Todo[]>([]);

// Funções auxiliares para modificar a store
export const addTodo = (todo: Todo) => {
  todoStore.update(todos => [...todos, todo]);
};

export const updateTodo = (id: number, updates: Partial<Todo>) => {
  todoStore.update(todos => 
    todos.map(t => // Usando 't' como parâmetro para evitar conflito com 'todo' se 'updates' contivesse 'todo'
      t.id === id ? { ...t, ...updates } : t
    )
  );
};

export const deleteTodo = (id: number) => {
  todoStore.update(todos => todos.filter(todo => todo.id !== id));
};

export const toggleTodoCompleted = (id: number) => {
  todoStore.update(todos => 
    todos.map(todo => 
      todo.id === id ? { ...todo, concluida: !todo.concluida } : todo
    )
  );
};

export const setTodos = (todos: Todo[]) => {
  todoStore.set(todos);
};