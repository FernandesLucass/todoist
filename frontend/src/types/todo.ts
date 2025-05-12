export interface Todo {
  id: number;
  titulo: string;
  descricao: string | null;
  concluida: boolean;
  criada_em?: string;
  atualizada_em?: string;
}

export interface CreateTodoInput {
  titulo: string;
  descricao?: string | null;
}

export interface UpdateTodoInput {
  id: number;
  titulo?: string;
  descricao?: string | null;
  concluida?: boolean;
}