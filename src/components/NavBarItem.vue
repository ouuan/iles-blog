<template>
  <li class="flex-1 flex items-stretch justify-center">
    <a
      class="p-3 bghover flex items-center"
      :href="href"
    >
      <span>{{ title }}</span>
    </a>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  href: string;
  title: string;
}>();
</script>
