<script lang="ts">
  import { todoStore } from '../stores/todoStore';
  
  // Contadores reativos para o total de tarefas e tarefas concluídas
  $: completedTasks = $todoStore.filter(todo => todo.concluida).length;
  $: totalTasks = $todoStore.length;
</script>

<header class="mb-8 text-center">
  <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">To Do: Lists & Tasks</h1>
  <p class="text-gray-600 dark:text-gray-300">
    {#if totalTasks > 0}
      <span class="font-semibold">{completedTasks}</span> de <span class="font-semibold">{totalTasks}</span> Tarefas Concluídas!
    {:else}
      <!-- <span>Ainda não há tarefas. Adicione sua primeira tarefa abaixo!</span> -->
    {/if}
  </p>
</header>