<template>
  <component
    :is="`h${level}`"
    v-if="level <= 6"
  >
    <slot />
  </component>
  <div
    v-else
    role="heading"
    :aria-level="level"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  level: number;
}>();
</script>
