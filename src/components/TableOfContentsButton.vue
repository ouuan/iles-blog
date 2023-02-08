<template>
  <button
    v-show="!show"
    id="__toc-open"
    title="显示文章目录"
    class="floating-button text-lg bottom-24"
    aria-haspopup="dialog"
    aria-controls="__toc"
    :aria-expanded="show"
    @click="display"
  >
    <span class="i-mdi-menu" />
  </button>
</template>

<script setup lang="ts">
import { nextTick } from 'vue';
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  showToc: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:showToc', value: boolean): void;
}>();

const show = useVModel(props, 'showToc', emit);

function display() {
  show.value = true;
  nextTick(() => {
    document.getElementById('__toc-close')?.focus();
  });
}
</script>
