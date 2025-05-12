<script lang="ts">
  import { onMount } from 'svelte';
  import { todoStore } from '../stores/todoStore';
  import { getTodos } from '../services/api';
  import TodoItem from './TodoItem.svelte';
  import Spinner from './Spinner.svelte';
  import type { Todo } from '../types/todo';

  let loading = true;
  let error: string | null = null;

  // Listas reativas derivadas da store principal
  let tarefasPendentes: Todo[] = [];
  let tarefasConcluidas: Todo[] = [];

  // $: é uma declaração reativa do Svelte.
  // Este bloco será reexecutado sempre que $todoStore mudar.
  $: {
    if ($todoStore) {
      tarefasPendentes = $todoStore.filter(todo => !todo.concluida);
      tarefasConcluidas = $todoStore.filter(todo => todo.concluida);
    } else {
      // Caso a store seja null ou undefined inicialmente (pouco provável com writable([]))
      tarefasPendentes = [];
      tarefasConcluidas = [];
    }
  }

  onMount(async () => {
    loading = true; // Garantir que loading seja true no início da busca
    error = null;   // Limpar erros anteriores
    try {
      const todos = await getTodos();
      todoStore.set(todos);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Falha ao buscar tarefas';
      // Usar dados de demonstração em caso de erro na busca inicial
      todoStore.set([
        { id: 1, titulo: 'Aprender Svelte (Demo)', descricao: 'Completar o tutorial do Svelte', concluida: true, criada_em: '', atualizada_em: '' },
        { id: 2, titulo: 'Construir App de Tarefas (Demo)', descricao: 'Criar um app de Tarefas com Svelte e Tailwind', concluida: false, criada_em: '', atualizada_em: '' },
        { id: 3, titulo: 'Deploy do App (Demo)', descricao: 'Publicar o aplicativo', concluida: false, criada_em: '', atualizada_em: '' }
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

  {#if !loading}
    <div>
      {#if tarefasPendentes.length > 0}
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3 mt-4">Pendentes</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each tarefasPendentes as todo (todo.id)}
            <div class="animate-slideIn">
              <TodoItem {todo} />
            </div>
          {/each}
        </div>
      {/if} 
    </div>

    {#if tarefasConcluidas.length > 0}
      <hr class="my-6 border-gray-300 dark:border-gray-600" />
      <div>
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Concluídas</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each tarefasConcluidas as todo (todo.id)}
            <div class="animate-slideIn">
              <TodoItem {todo} />
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/if}

  {#if $todoStore.length === 0 && !loading && !error}
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center mt-4">
      <p class="text-gray-600 dark:text-gray-300">Nenhuma tarefa adicionada ainda. Adicione uma nova tarefa no botão acima para começar!</p>
    </div>
  {/if}
</div>