<template>
  <div
    id="__toc"
    class="toc-drawer fixed inset-y-0 z-15 bg-card py-6 shadow-lg"
    aria-label="文章目录"
    role="dialog"
    :style="{ right: tocRight }"
    :aria-hidden="!show"
  >
    <table-of-contents-common
      :headings="headings"
      @close="show = false"
    />
  </div>
  <table-of-contents-button
    v-model:show-toc="show"
    aria-haspopup="dialog"
  />
  <div
    v-show="show"
    aria-hidden="true"
    class="fixed bottom-0 left-0 right-0 top-0 z-10 bg-gray-8 opacity-50"
    @click="show = false"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import type { Heading } from '@islands/headings';

defineProps<{
  headings: Heading[];
}>();

const show = ref(false);
const tocRight = computed(() => (show.value ? '0' : 'calc(-5px - var(--toc-width))'));

onKeyStroke('Escape', () => {
  show.value = false;
});
</script>

<style lang="scss" scoped>
.toc-drawer {
  --toc-width: calc(min(24rem, 60vw));
  width: var(--toc-width);
  transition-property: right, width;
  @apply ease-out motion-safe:duration-240;
}
</style>
