
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Todo } from '../types/todo'; // Importa nossa interface Todo MODIFICADA
  import { toggleTodoCompleted as apiToggleTodo, deleteTodo as apiDeleteTodo } from '../services/api';
  import { toggleTodoCompleted, deleteTodo, updateTodo } from '../stores/todoStore'; // toggleTodoCompleted na store já usa 'concluida'
  import TodoEditForm from './TodoEditForm.svelte';

  export let todo: Todo; // Recebe o objeto Todo com os campos corretos: titulo, descricao, concluida

  let isEditing = false;
  let isDeleting = false;
  let isUpdating = false;

  async function handleToggleCompleted() {
    try {
      isUpdating = true;
      // Atualiza a store localmente primeiro
      toggleTodoCompleted(todo.id); 

      // Depois atualiza o backend
      // A prop 'todo' aqui pode não ter o valor mais recente de 'concluida' após o toggle na store.
      // É mais seguro pegar o valor atualizado da store ou enviar o oposto do valor original.
      // Para esta chamada, usaremos !todo.concluida (o estado original da prop 'todo' invertido).
      // Ajustaremos apiToggleTodo em api.ts depois para lidar com o payload { concluida: boolean }.
      await apiToggleTodo(todo.id, !todo.concluida); // Alterado para usar todo.concluida
    } catch (error) {
      console.error('Failed to toggle todo status:', error);
      // Reverte a mudança na store se a chamada API falhar
      toggleTodoCompleted(todo.id); 
      alert('Failed to update task status. Please try again.');
    } finally {
      isUpdating = false;
    }
  }

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return;
    }

    try {
      isDeleting = true;
      deleteTodo(todo.id); // Remove da store
      await apiDeleteTodo(todo.id); // Deleta no backend (precisaremos ajustar apiDeleteTodo em api.ts depois)
    } catch (error) {
      console.error('Failed to delete todo:', error);
      alert('Failed to delete task. Please try again.');
    }
    // Não resetar isDeleting = false aqui, pois o item some.
  }

  function startEditing() {
    isEditing = true;
  }

  function cancelEditing() {
    isEditing = false;
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
          checked={todo.concluida} disabled={isUpdating}
          on:change={handleToggleCompleted}
        />
      </div>
      <div class="ml-3 flex-grow">
        <label
          for="todo-{todo.id}"
          class="font-medium text-gray-800 dark:text-gray-100 cursor-pointer {todo.concluida ? 'line-through text-gray-500 dark:text-gray-400' : ''}"
        >
          {todo.titulo} </label>
      </div>
    </div>

    <div class="ml-8 text-gray-600 dark:text-gray-300 text-sm mb-4 {todo.concluida ? 'line-through text-gray-400 dark:text-gray-500' : ''}">
      {#if todo.descricao} {todo.descricao} {:else}
        <span class="italic text-gray-400 dark:text-gray-500">Sem descrição</span>
      {/if}
    </div>

    <div class="flex justify-end space-x-2 mt-2">
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
      {#if todo.concluida} <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-500 text-white">
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