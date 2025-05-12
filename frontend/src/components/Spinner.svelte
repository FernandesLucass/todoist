<script lang="ts">
  export let size: 'small' | 'medium' | 'large' = 'medium';

  $: sizeClass = 
    size === 'small' ? 'w-5 h-5' :
    size === 'large' ? 'w-12 h-12' :
    'w-8 h-8';
</script>

<div class="flex justify-center items-center">
  <div class="{sizeClass} border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
</div>