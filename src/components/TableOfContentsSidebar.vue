<template>
  <aside
    class="sticky top-16 bg-card py-6 m-3 rd-2 w-72 2xl:w-84 3xl:w-96 shadow hidden xl:block"
    aria-labelledby="__toc-title"
    style="max-height: calc(100vh - 10rem);"
  >
    <table-of-contents-common :headings="headings" />
  </aside>
</template>

<script setup lang="ts">
import { Heading } from '@islands/headings';

defineProps<{
  headings: Heading[];
}>();
</script>
