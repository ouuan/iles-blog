<template>
  <div class="rd-1 bg-card py-1 pl-2">
    <search-bar
      class="flex"
      :initial-pattern="searchPattern"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBrowserLocation } from '@vueuse/core';

const location = useBrowserLocation();
const searchPattern = computed(
  () => location.value.pathname?.match(/\/posts?\/[^a-z]+\/([^/]+)/)?.[1],
);
</script>
