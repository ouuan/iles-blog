<template>
  <div
    id="__toc-drawer"
    class="toc-drawer bg-card py-6 shadow-lg fixed inset-y-0 z-15"
    aria-label="文章目录"
    role="dialog"
    :style="{ right: tocRight }"
    :aria-hidden="!displayToc"
  >
    <table-of-contents-common
      :headings="headings"
      drawer
      @close="displayToc = false"
    />
  </div>
  <button
    class="floating-button text-lg bottom-24"
    title="显示文章目录"
    :aria-hidden="displayToc"
    aria-haspopup="dialog"
    aria-controls="__toc-drawer"
    @click="displayToc = true"
  >
    <span class="i-mdi-menu" />
  </button>
  <div
    v-show="displayToc"
    aria-hidden="true"
    class="fixed top-0 bottom-0 left-0 right-0 bg-gray-8 opacity-50 z-10"
    @click="displayToc = false"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { Heading } from '@islands/headings';

defineProps<{
  headings: Heading[];
}>();

const displayToc = ref(false);
const tocRight = computed(() => (displayToc.value ? '0' : 'calc(-5px - var(--toc-width))'));

onKeyStroke('Escape', () => {
  displayToc.value = false;
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
