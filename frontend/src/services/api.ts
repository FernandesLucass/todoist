import type { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

const API_URL = 'http://localhost:3303';

// Função auxiliar para tratar erros de fetch que esperam JSON na resposta
async function handleJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: `API error: ${response.status} ${response.statusText}` }));
    throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

// Função auxiliar para tratar erros de fetch que esperam apenas status OK
async function handleOkResponse(response: Response, operation: string): Promise<void> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => `API error during ${operation}: ${response.status} ${response.statusText}`);
    throw new Error(errorText || `API error during ${operation}: ${response.status} ${response.statusText}`);
  }
  // Nenhuma ação com o corpo da resposta se for bem-sucedido para estas operações
}

// Busca todas as tarefas
export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/tarefas`);
  return handleJsonResponse<Todo[]>(response);
}

// Busca uma única tarefa pelo ID
export async function getTodoById(id: number): Promise<Todo> {
  const response = await fetch(`${API_URL}/tarefas/${id}`);
  return handleJsonResponse<Todo>(response);
}

// Cria uma nova tarefa
export async function createTodo(todoData: CreateTodoInput): Promise<Todo> {
  const response = await fetch(`${API_URL}/tarefas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  return handleJsonResponse<Todo>(response);
}

// Atualiza uma tarefa existente
export async function updateTodo(todoData: UpdateTodoInput): Promise<void> {
  const response = await fetch(`${API_URL}/tarefas/${todoData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  return handleOkResponse(response, 'update task');
}

// Deleta uma tarefa
export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/tarefas/${id}`, {
    method: 'DELETE',
  });
  return handleOkResponse(response, 'delete task');
}

// Alterna o status de concluída de uma tarefa
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