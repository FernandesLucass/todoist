<script lang="ts">
  import { createTodo as apiCreateTodo } from '../services/api';
  import { addTodo } from '../stores/todoStore';
  
  let title = '';
  let description = '';
  let isSubmitting = false;
  let isFormOpen = false;
  let titleError = '';
  
  function validateForm() {
    titleError = '';
    if (!title.trim()) {
      titleError = 'Title is required';
      return false;
    }
    return true;
  }
  
  // Dentro de AddTodoForm.svelte - função handleSubmit MODIFICADA
  async function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;
    try {
      // Criamos um objeto com os nomes de campos corretos para a API
      const dadosNovaTarefa = {
        titulo: title,       // Mapeando 'title' do formulário para 'titulo'
        descricao: description // Mapeando 'description' do formulário para 'descricao'
      };
      const novaTarefaCriada = await apiCreateTodo(dadosNovaTarefa); // Envia os dados corretos

      // Adiciona a tarefa retornada pelo backend (que já tem o ID correto) à store
      addTodo(novaTarefaCriada); 

      // Reseta o formulário
      title = '';
      description = '';
      isFormOpen = false; // Fecha o formulário após sucesso
      titleError = '';    // Limpa erro do título
    } catch (error) {
      console.error('Failed to create todo:', error);
      alert('Falha ao criar tarefa: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      // Não vamos adicionar um mockTodo na falha por enquanto para simplificar
      // e evitar inconsistências de tipo, já que o erro 400 impede a criação.
      // O formulário permanecerá aberto com os dados para o usuário tentar corrigir/reenviar.
    } finally {
      isSubmitting = false;
    }
  }
  
  function toggleForm() {
    isFormOpen = !isFormOpen;
    if (!isFormOpen) {
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
      Adicionar Tarefa
    </button>
  {:else}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4 animate-fadeIn">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          id="title"
          type="text"
          class="input mt-1"
          class:border-red-500={titleError}
          bind:value={title}
          placeholder="Título da tarefa"
        />
        {#if titleError}
          <p class="mt-1 text-sm text-red-600">{titleError}</p>
        {/if}
      </div>
      
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description (optional)
        </label>
        <textarea
          id="description"
          class="input mt-1"
          rows="3"
          bind:value={description}
          placeholder="Descrição da tarefa (opcional)"
        ></textarea>
      </div>
      
      <div class="flex justify-end space-x-2">
        <button
          type="button"
          class="btn btn-outline"
          on:click={toggleForm}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
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