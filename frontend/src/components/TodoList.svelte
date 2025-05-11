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
      // Fetch todos from the API
      const todos = await getTodos();
      todoStore.set(todos);
      error = null;
// ...
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch todos';
    todoStore.set([
      { id: 1, titulo: 'Learn Svelte (Demo)', descricao: 'Complete the Svelte tutorial', concluida: true },
      { id: 2, titulo: 'Build a Todo App (Demo)', descricao: 'Create a Todo app with Svelte and Tailwind', concluida: false },
      { id: 3, titulo: 'Deploy the App (Demo)', descricao: '', concluida: false }
    ]);
// ...
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
      <p class="font-bold">Error</p>
      <p>{error}</p>
      <p class="mt-2 text-sm">Using demo data instead.</p>
    </div>
  {/if}
  
  {#if $todoStore.length === 0 && !loading}
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
      <p class="text-gray-600 dark:text-gray-300">Nenhuma tarefa adicionada ainda. Adicione uma nova tarefa no botão acima para começar!</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each $todoStore as todo (todo.id)}
        <div class="animate-slideIn">
          <TodoItem {todo} />
        </div>
      {/each}
    </div>
  {/if}
</div>