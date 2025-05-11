<script lang="ts">
  import TodoList from './components/TodoList.svelte';
  import AddTodoForm from './components/AddTodoForm.svelte';
  import { onMount } from 'svelte';
  import { todoStore } from './stores/todoStore';
  import { getTodos } from './services/api';
  import Header from './components/Header.svelte';
</script>

<main class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <div class="container mx-auto px-4 py-8">
    <Header />
    
    <div class="max-w-3xl mx-auto">
      <div class="mb-8 animate-fadeIn">
        <AddTodoForm />
      </div>
      
      <div class="animate-fadeIn">
        <TodoList />
      </div>
    </div>
  </div>
</main>

<svelte:head>
  <title>Todo App</title>
</svelte:head>