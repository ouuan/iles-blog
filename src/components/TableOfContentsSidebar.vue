<template>
  <aside
    v-show="show"
    id="__toc"
    class="sticky top-16 bg-card py-6 m-4 rd-2 w-72 2xl:w-84 3xl:w-96 shadow hidden xl:block"
    aria-label="文章目录"
    style="max-height: calc(100vh - 10rem);"
    itemprop="hasPart"
    itemscope
    itemtype="https://schema.org/WPSideBar"
  >
    <table-of-contents-common
      :headings="headings"
      @close="show = false"
    />
  </aside>
  <table-of-contents-button v-model:show-toc="show" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Heading } from '@islands/headings';

defineProps<{
  headings: Heading[];
}>();

const show = ref(true);
</script>
