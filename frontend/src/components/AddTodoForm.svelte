<script lang="ts">
  import { createTodo as apiCreateTodo } from '../services/api';
  import { addTodo } from '../stores/todoStore';
  
  let title = '';
  let description = '';
  let isSubmitting = false;
  let isFormOpen = false;
  let titleError = ''; // Mensagem de erro para o campo título
  
  function validateForm(): boolean {
    titleError = '';
    if (!title.trim()) {
      titleError = 'O título é obrigatório'; 
      return false;
    }
    return true;
  }
  
  async function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;
    try {
      const dadosNovaTarefa = {
        titulo: title,
        descricao: description
      };
      const novaTarefaCriada = await apiCreateTodo(dadosNovaTarefa); 
      addTodo(novaTarefaCriada); 

      // Reseta e fecha o formulário após sucesso
      title = '';
      description = '';
      isFormOpen = false; 
      titleError = '';    
    } catch (error) {
      console.error('Falha ao criar tarefa (log):', error); 
      alert('Falha ao criar tarefa: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    } finally {
      isSubmitting = false;
    }
  }
  
  function toggleForm() {
    isFormOpen = !isFormOpen;
    if (!isFormOpen) { // Limpa os campos se o formulário for fechado sem submeter
      title = '';
      description = '';
      titleError = '';
    }
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
  {#if !isFormOpen}
    <button
      on:click={toggleForm}
      class="btn btn-primary w-full flex items-center justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
      Adicionar Tarefa </button>
  {:else}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4 animate-fadeIn">
      <div>
        <label for="add-form-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Título
        </label>
        <input
          id="add-form-title" type="text"
          class="input mt-1"
          class:border-red-500={titleError}
          bind:value={title}
          placeholder="Título da tarefa" />
        {#if titleError}
          <p class="mt-1 text-sm text-red-600">{titleError}</p> {/if}
      </div>
      
      <div>
        <label for="add-form-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Descrição (opcional)
        </label>
        <textarea
          id="add-form-description" class="input mt-1"
          rows="3"
          bind:value={description}
          placeholder="Descrição da tarefa (opcional)" ></textarea>
      </div>
      
      <div class="flex justify-end space-x-2">
        <button
          type="button"
          class="btn btn-outline"
          on:click={toggleForm}
          disabled={isSubmitting}
        >
          Cancelar </button>
        <button
          type="submit"
          class="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adicionando...' : 'Adicionar'} 
        </button>
      </div>
    </form>
  {/if}
</div>