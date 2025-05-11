<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type { Todo, UpdateTodoInput } from '../types/todo'; // Importando UpdateTodoInput também
  import { updateTodo as apiUpdateTodo } from '../services/api';
  import { updateTodo as storeUpdateTodo } from '../stores/todoStore'; // Renomeado para clareza

  export let todo: Todo;

  // Variáveis locais do formulário
  let currentTitle = '';
  let currentDescription = '';

  // Inicializa as variáveis locais com os valores da prop 'todo' quando o componente é montado
  onMount(() => {
    currentTitle = todo.titulo;
    currentDescription = todo.descricao || ''; // Garante que seja string, mesmo se descricao for null
  });

  let isSubmitting = false;
  let titleError = ''; // Para o erro de validação do título

  const dispatch = createEventDispatcher();

  function validateForm() {
    titleError = '';
    if (!currentTitle.trim()) {
      titleError = 'Título é obrigatório'; // Mensagem traduzida
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;
    try {
      // Objeto com os campos que foram atualizados, usando os nomes corretos
      const updatedFields: Partial<Todo> = {
        titulo: currentTitle,
        descricao: currentDescription,
        // Não incluímos 'concluida' aqui, pois este form não a altera.
        // Mantemos o 'id' e 'concluida' originais da prop 'todo' para a store,
        // ou passamos apenas os campos que mudaram.
        // A store 'updateTodo' espera Partial<Todo>, então só os campos alterados bastam.
      };

      // Atualiza a store localmente (otimismo)
      storeUpdateTodo(todo.id, updatedFields); 

      // Prepara dados para a API, incluindo o ID e os campos corretos
      const dataForApi: UpdateTodoInput = {
        id: todo.id,
        titulo: currentTitle,
        descricao: currentDescription
        // Não precisamos enviar 'concluida' se não a alteramos neste form.
        // A função apiUpdateTodo no api.ts já está esperando UpdateTodoInput,
        // que tem os campos como opcionais.
      };
      await apiUpdateTodo(dataForApi); 

      dispatch('save'); // Emite o evento para fechar o formulário no TodoItem.svelte
    } catch (error) {
      console.error('Falha ao atualizar tarefa:', error); // Sua tradução mantida
      alert('Falha ao atualizar tarefa! Por favor, tente novamente.'); // Sua tradução mantida
      // Poderíamos considerar reverter a atualização da store aqui,
      // mas por ora o alerta é suficiente e o usuário pode tentar de novo.
    } finally {
      isSubmitting = false;
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4 bg-gray-600 dark:bg-gray-750 p-4 rounded-md shadow-inner">
  <div>
    <label for="edit-title-{todo.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Título
    </label>
    <input
      id="edit-title-{todo.id}"
      type="text"
      class="input mt-1 w-full"
      class:border-red-500={titleError}
      bind:value={currentTitle}
      placeholder="Título da tarefa"
    />
    {#if titleError}
      <p class="mt-1 text-sm text-red-600">{titleError}</p>
    {/if}
  </div>

  <div>
    <label for="edit-description-{todo.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Descrição (opcional)
    </label>
    <textarea
      id="edit-description-{todo.id}"
      class="input mt-1 w-full"
      rows="3"
      bind:value={currentDescription}
      placeholder="Descrição da tarefa"
    ></textarea>
  </div>

  <div class="flex justify-end space-x-2 pt-2">
    <button
      type="button"
      class="btn btn-outline"
      on:click={handleCancel}
      disabled={isSubmitting}
    >
      Cancelar
    </button>
    <button
      type="submit"
      class="btn btn-primary"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
    </button>
  </div>
</form>