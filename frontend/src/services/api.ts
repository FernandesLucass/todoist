// src/services/api.ts - VERSÃO COMPLETA E CORRIGIDA

import type { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

// Base URL para a sua API (já estava correta)
const API_URL = 'http://localhost:3303';

// Função auxiliar para tratar erros de fetch que esperam JSON na resposta (usada por GET)
async function handleJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: `API error: ${response.status} ${response.statusText}` }));
    throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

// Função auxiliar para tratar erros de fetch que esperam apenas status OK (usada por POST, PUT, DELETE)
async function handleOkResponse(response: Response, operation: string): Promise<void> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => `API error during ${operation}: ${response.status} ${response.statusText}`);
    throw new Error(errorText || `API error during ${operation}: ${response.status} ${response.statusText}`);
  }
  // Nenhuma ação com o corpo da resposta se for bem-sucedido para estas operações
}

// Get all todos (Buscando da rota /tarefas)
export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/tarefas`);
  return handleJsonResponse<Todo[]>(response);
}

// Get a single todo by ID (Buscando da rota /tarefas/:id)
export async function getTodoById(id: number): Promise<Todo> {
  const response = await fetch(`${API_URL}/tarefas/${id}`); // Corrigido de /todos para /tarefas
  return handleJsonResponse<Todo>(response);
}

// Create a new todo (Enviando para /tarefas e esperando o Todo criado de volta)
// CreateTodoInput já usa 'titulo' e 'descricao' por causa das nossas mudanças em types/todo.ts
export async function createTodo(todoData: CreateTodoInput): Promise<Todo> { // <-- Mudado para Promise<Todo>
  const response = await fetch(`${API_URL}/tarefas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  return handleJsonResponse<Todo>(response); // <-- Mudado para handleJsonResponse<Todo>
}

// Update a todo (Enviando para /tarefas/:id)
// UpdateTodoInput já usa 'titulo', 'descricao', 'concluida' por causa de types/todo.ts
export async function updateTodo(todoData: UpdateTodoInput): Promise<void> {
  const response = await fetch(`${API_URL}/tarefas/${todoData.id}`, { // Corrigido de /todos para /tarefas
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData), // Enviando todo o objeto (id não é necessário no corpo, mas não prejudica)
  });
  return handleOkResponse(response, 'update task');
}

// Delete a todo (Enviando para /tarefas/:id) - CORRIGIDO
export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/tarefas/${id}`, { // CORRIGIDO
    method: 'DELETE',
  });
  return handleOkResponse(response, 'delete task');
}

// Toggle todo completed status (Enviando para /tarefas/:id/status) - JÁ ESTAVA CORRETO
export async function toggleTodoCompleted(id: number, novoEstadoConcluida: boolean): Promise<void> {
  const response = await fetch(`${API_URL}/tarefas/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ concluida: novoEstadoConcluida }),
  });
  return handleOkResponse(response, 'toggle task status');
}