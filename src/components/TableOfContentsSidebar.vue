<template>
  <aside
    v-show="show"
    id="__toc"
    class="sticky top-16 m-4 hidden w-72 rd-2 bg-card py-6 shadow xl:block 2xl:w-84 3xl:w-96"
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
import type { Heading } from '@islands/headings';
import { ref } from 'vue';

defineProps<{
  headings: Heading[];
}>();

const show = ref(true);
</script>
