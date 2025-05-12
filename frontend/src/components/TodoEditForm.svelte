<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type { Todo, UpdateTodoInput } from '../types/todo';
  import { updateTodo as apiUpdateTodo } from '../services/api';
  import { updateTodo as storeUpdateTodo } from '../stores/todoStore';

  export let todo: Todo;

  // Variáveis locais para os campos do formulário
  let currentTitle = '';
  let currentDescription = '';
  
  let isSubmitting = false;
  let titleError = '';

  // Inicializa os campos do formulário com os valores da tarefa atual ao montar o componente
  onMount(() => {
    currentTitle = todo.titulo;
    currentDescription = todo.descricao || ''; // Garante que seja string, mesmo se descricao for null
  });

  const dispatch = createEventDispatcher();

  function validateForm(): boolean {
    titleError = '';
    if (!currentTitle.trim()) {
      titleError = 'Título é obrigatório';
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;
    try {
      const updatedFields: Partial<Todo> = {
        titulo: currentTitle,
        descricao: currentDescription,
      };
      storeUpdateTodo(todo.id, updatedFields); // Atualização otimista na store

      const dataForApi: UpdateTodoInput = {
        id: todo.id,
        titulo: currentTitle,
        descricao: currentDescription,
      };
      await apiUpdateTodo(dataForApi); // Atualização no backend

      dispatch('save'); // Sinaliza que salvou com sucesso
    } catch (error) {
      console.error('Falha ao atualizar tarefa:', error);
      alert('Falha ao atualizar tarefa! Por favor, tente novamente.');
    } finally {
      isSubmitting = false;
    }
  }

  function handleCancel() {
    dispatch('cancel'); // Sinaliza o cancelamento
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