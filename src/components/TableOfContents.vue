<template>
  <div class="flex print:hidden">
    <table-of-contents-drawer
      v-if="displayDrawer"
      :headings="headings"
    />
    <table-of-contents-sidebar
      v-else
      :headings="headings"
    />
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import type { Heading } from '@islands/headings';

defineProps<{
  headings: Heading[];
}>();

/*
 * Cannot use (min-width: 79.9em) to display sidebar,
 * because the initial value of useMediaQuery is false,
 * and the sidebar should be displayed before hydration to avoid layout shift.
 * Cannot use useBreakpoints.smaller, either,
 * because it uses (min-width: 79.9em - 0.1px) internally
 * and hides both types of toc when width is exactly 79.9em
 */
const displayDrawer = useMediaQuery('(max-width: 79.9em)');
</script>
