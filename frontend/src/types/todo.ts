// src/types/todo.ts MODIFICADO

export interface Todo {
  id: number;
  titulo: string;                 // Alterado de 'title' para 'titulo'
  descricao: string | null;       // Alterado de 'description' para 'descricao', e permite null
  concluida: boolean;             // Alterado de 'completed' para 'concluida' (vamos tratar 0/1 como boolean no frontend)
  criada_em?: string;             // Campo opcional que vem do backend
  atualizada_em?: string;         // Campo opcional que vem do backend
}

export interface CreateTodoInput {
  titulo: string;                 // Alterado de 'title' para 'titulo'
  descricao?: string | null;      // Alterado de 'description' para 'descricao', opcional e permite null
}

export interface UpdateTodoInput {
  id: number;
  titulo?: string;                // Alterado de 'title' para 'titulo'
  descricao?: string | null;      // Alterado de 'description' para 'descricao', permite null
  concluida?: boolean;            // Alterado de 'completed' para 'concluida'
}