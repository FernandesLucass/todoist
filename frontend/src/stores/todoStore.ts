// src/stores/todoStore.ts MODIFICADO COMPLETO
import { writable } from 'svelte/store';
import type { Todo } from '../types/todo'; // Importa a interface Todo MODIFICADA

export const todoStore = writable<Todo[]>([]);

// Helper functions for modifying the store
export const addTodo = (todo: Todo) => {
  todoStore.update(todos => [...todos, todo]);
};

export const updateTodo = (id: number, updates: Partial<Todo>) => {
  todoStore.update(todos => 
    todos.map(t => // Mudei 'todo' para 't' para evitar conflito com o 'todo' do map
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
      todo.id === id ? { ...todo, concluida: !todo.concluida } : todo // Alterado aqui
    )
  );
};

export const setTodos = (todos: Todo[]) => {
  todoStore.set(todos);
};