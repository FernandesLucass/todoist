<script lang="ts">
  import { createEventDispatcher } from 'svelte'; // Já deve estar aqui
  import type { Todo } from '../types/todo';
  import { toggleTodoCompleted as apiToggleTodo, deleteTodo as apiDeleteTodo } from '../services/api';
  import { toggleTodoCompleted, deleteTodo } from '../stores/todoStore';
  import TodoEditForm from './TodoEditForm.svelte';

  export let todo: Todo;

  let isEditing = false;
  let isDeleting = false;
  let isUpdating = false;

  const dispatch = createEventDispatcher(); // Já deve estar aqui

  async function handleToggleCompleted() {
    // ... (código existente, sem alterações aqui)
    try {
      isUpdating = true;
      toggleTodoCompleted(todo.id); 
      await apiToggleTodo(todo.id, !todo.concluida); 
    } catch (error) {
      console.error('Falha ao alterar status da tarefa:', error);
      toggleTodoCompleted(todo.id); 
      alert('Falha ao atualizar status da tarefa. Por favor, tente novamente.');
    } finally {
      isUpdating = false;
    }
  }

  async function handleDelete() {
    // ... (código existente, sem alterações aqui)
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return;
    }
    try {
      isDeleting = true;
      deleteTodo(todo.id); 
      await apiDeleteTodo(todo.id); 
    } catch (error) {
      console.error('Falha ao excluir tarefa:', error);
      alert('Falha ao excluir tarefa. Por favor, tente novamente.');
    }
  }

  function startEditing() {
    isEditing = true;
  }

  function cancelEditing() {
    isEditing = false;
  }

  // NOVA ALTERAÇÃO: Função para disparar o evento 'viewdetails'
  function handleViewDetails() {
    dispatch('viewdetails', todo); // Envia o evento com o objeto 'todo' atual
  }
</script>

<div class="task-card relative {todo.concluida ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}">
  {#if isEditing}
    <TodoEditForm {todo} on:save={() => isEditing = false} on:cancel={cancelEditing} />
  {:else}
    <div class="flex items-start mb-2">
      <div class="relative flex items-center h-5">
        <input
          id="todo-{todo.id}"
          type="checkbox"
          class="w-5 h-5 text-primary-600 border-gray-300 rounded cursor-pointer focus:ring-primary-500"
          checked={todo.concluida} 
          disabled={isUpdating}
          on:change={handleToggleCompleted}
        />
      </div>
      <div class="ml-3 flex-grow pr-20 md:pr-24"> 
        <label
          for="todo-{todo.id}"
          class="font-medium text-gray-800 dark:text-gray-100 cursor-pointer {todo.concluida ? 'line-through text-gray-500 dark:text-gray-400' : ''}"
        >
          {todo.titulo}
        </label>
      </div>
    </div>

    <div class="ml-8 text-gray-600 dark:text-gray-300 text-sm mb-4 {todo.concluida ? 'line-through text-gray-400 dark:text-gray-500' : ''} line-clamp-3">
      {#if todo.descricao}
        {todo.descricao}
      {:else}
        <span class="italic text-gray-400 dark:text-gray-500">Sem descrição</span>
      {/if}
    </div>

    <div class="flex justify-end items-center space-x-2 mt-2">
      <button
        class="btn btn-outline text-xs py-1 px-2"
        on:click={handleViewDetails}
        aria-label="Ver detalhes da tarefa {todo.titulo}"
      >
        Detalhes
      </button>
      <button
        class="btn btn-outline text-sm py-1"
        on:click={startEditing}
      >
        Editar
      </button>
      <button
        class="btn btn-danger text-sm py-1"
        on:click={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Excluindo...' : 'Excluir'}
      </button>
    </div>

    <div class="absolute top-2 right-2">
      {#if todo.concluida}
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-500 text-white">
          Concluída
        </span>
      {:else}
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Pendente
        </span>
      {/if}
    </div>
  {/if}
</div>
