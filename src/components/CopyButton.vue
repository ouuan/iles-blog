<template>
  <button
    class="copy-button print:hidden"
    @click="copy"
  >
    <span
      v-if="state === 'normal'"
      title="复制到剪贴板"
      class="b-gray-8 text-light-9"
    >
      <span class="i-mdi-content-copy" />
    </span>
    <span
      v-else-if="state === 'success'"
      title="复制成功"
      class="b-success text-success"
    >
      <span class="i-mdi-check" />
    </span>
    <span
      v-else
      title="复制失败"
      class="b-error text-error"
    >
      <span class="i-mdi-alert-circle-outline" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  toBeCopied: string;
}>();

const state = ref<'normal' | 'success' | 'error'>('normal');
let timeout: NodeJS.Timeout;

async function copy() {
  try {
    await navigator.clipboard.writeText(props.toBeCopied);
    state.value = 'success';
  } catch (e) {
    state.value = 'error';
    alert(`复制失败: ${e}`);
  } finally {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      state.value = 'normal';
    }, 2000);
  }
}
</script>

<style lang="scss" scoped>
.copy-button > span {
  @apply bg-gruvboxbg hover:bg-dark-2 active:bg-dark-8;
  @apply b-2 rd-1;
  @apply w-6 h-6 text-sm;
  @apply flex justify-center items-center;

  @media (hover: hover) {
    @apply w-8 h-8 rd-2 text-base;
  }
}
</style>
