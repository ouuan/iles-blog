<template>
  <button
    v-show="!show"
    id="__toc-open"
    title="显示文章目录"
    class="bottom-24 text-lg floating-button"
    aria-haspopup="dialog"
    aria-controls="__toc"
    :aria-expanded="show"
    @click="display"
  >
    <span class="i-mdi-menu" />
  </button>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { nextTick } from 'vue';

const props = defineProps<{
  showToc: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:showToc', value: boolean): void;
}>();

const show = useVModel(props, 'showToc', emit);

async function display() {
  show.value = true;
  await nextTick(() => {
    document.getElementById('__toc-close')?.focus();
  });
}
</script>
