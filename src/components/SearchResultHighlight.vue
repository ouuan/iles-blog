<template>
  <span
    v-if="delimiter"
    class="search-highlight"
  >
    <span
      v-for="(part, index) of parts"
      :key="index"
    >
      {{ part }}
    </span>
  </span>
  <span v-else>{{ text }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  delimiter?: string;
  text: string;
}>();

const parts = computed(() => {
  if (props.delimiter) return props.text.split(props.delimiter);
  return [];
});
</script>

<style scoped lang="scss">
.search-highlight > :nth-child(even) {
  @apply bg-#FFD30D dark:bg-#5A4900;
}
</style>
