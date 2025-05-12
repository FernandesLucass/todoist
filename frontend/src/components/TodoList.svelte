<script lang="ts">
  import { onMount } from 'svelte';
  import { todoStore } from '../stores/todoStore';
  import { getTodos } from '../services/api';
  import TodoItem from './TodoItem.svelte';
  import Spinner from './Spinner.svelte';
  import type { Todo } from '../types/todo';
  
  let loading = true;
  let error: string | null = null;
  
  onMount(async () => {
    try {
      const todos = await getTodos();
      todoStore.set(todos);
      error = null; 
    } catch (err) {
      error = err instanceof Error ? err.message : 'Falha ao buscar tarefas'; 
      todoStore.set([
        { id: 1, titulo: 'Aprender Svelte (Demo)', descricao: 'Completar o tutorial do Svelte', concluida: true },
        { id: 2, titulo: 'Construir App de Tarefas (Demo)', descricao: 'Criar um app de Tarefas com Svelte e Tailwind', concluida: false },
        { id: 3, titulo: 'Deploy do App (Demo)', descricao: 'Publicar o aplicativo', concluida: false }
      ]);
    } finally {
      loading = false;
    }
  });
</script>

<div>
  {#if loading}
    <div class="flex justify-center py-8">
      <Spinner />
    </div>
  {:else if error}
    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded" role="alert">
      <p class="font-bold">Erro</p>
      <p>{error}</p>
      <p class="mt-2 text-sm">Usando dados de demonstração.</p>
    </div>
  {/if}
  
  {#if $todoStore.length === 0 && !loading && !error}
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
      <p class="text-gray-600 dark:text-gray-300">Nenhuma tarefa adicionada ainda. Adicione uma nova tarefa no botão acima para começar!</p>
    </div>
  {:else if !loading}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each $todoStore as todo (todo.id)}
        <div class="animate-slideIn">
          <TodoItem {todo} />
        </div>
      {/each}
    </div>
  {/if}
</div>