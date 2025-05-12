<script lang="ts">
  import type { Todo } from '../types/todo';
  import { createEventDispatcher } from 'svelte';

  export let isOpen = false;
  export let todo: Todo | null = null;

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('close');
  }

  function handleOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  function handleOverlayKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Evita o scroll com espaço
      closeModal();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (isOpen && event.key === 'Escape') { 
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && todo}
  <div 
    class="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4"
    on:click={handleOverlayClick}
    on:keydown={handleOverlayKeydown}
    tabindex="0"
    role="button"
    aria-label="Fechar modal ao pressionar Enter ou Espaço"
    aria-labelledby="modal-title"
  >
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full animate-fadeIn" role="document">
      <div class="flex justify-between items-center mb-4">
        <h2 id="modal-title" class="text-2xl font-semibold text-gray-800 dark:text-gray-100 break-words">
          {todo.titulo}
        </h2>
        <button 
          on:click={closeModal} 
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Fechar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none break-words max-h-72 overflow-y-auto">
        {#if todo.descricao}
          {@html todo.descricao.replace(/\n/g, '<br/>')}
        {:else}
          <p class="italic">Sem descrição.</p>
        {/if}
      </div>
      <div class="mt-6 flex justify-end">
        <button 
          on:click={closeModal} 
          class="btn btn-primary"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
{/if}
