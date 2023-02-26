<template>
  <li class="flex flex-1 items-stretch justify-center">
    <a
      class="flex items-center p-3 bghover"
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
