<script lang="ts">
  export let size = 'medium';
  
  let sizeClass = 'w-8 h-8';
  if (size === 'small') sizeClass = 'w-5 h-5';
  if (size === 'large') sizeClass = 'w-12 h-12';
</script>

<div class="flex justify-center items-center">
  <div class="{sizeClass} border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
</div>