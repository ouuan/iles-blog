<template>
  <button
    ref="buttonRef"
    :title="label[state]"
    :class="['copy-button', classes[state]]"
    @click="copy"
  >
    <span :class="icon[state]" />
    <span
      class="absolute left-100vw"
      role="status"
    >
      {{ status[state] }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const buttonRef = ref<HTMLElement | null>(null);
const state = ref<'normal' | 'success' | 'error'>('normal');
let timeout: NodeJS.Timeout;

const label = {
  normal: '复制到剪贴板',
  success: '复制成功',
  error: '复制失败',
} as const;

const classes = {
  normal: 'b-footer text-footer',
  success: 'b-success text-success',
  error: 'b-error text-error',
} as const;

const icon = {
  normal: 'i-mdi-content-copy',
  success: 'i-mdi-check',
  error: 'i-mdi-alert-circle-outline',
} as const;

const status = {
  normal: '',
  success: '复制成功',
  error: '复制失败',
} as const;

async function copy() {
  try {
    // parent could be <ile-root>
    let parent = buttonRef.value;
    while (parent && !parent.classList.contains('code-block')) parent = parent.parentElement;
    const code = parent?.querySelector('pre.shiki')?.textContent;
    if (typeof code !== 'string') {
      throw new Error('Code not found');
    }
    await navigator.clipboard.writeText(code);
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
.copy-button {
  @apply flex justify-center items-center;

  @apply absolute top-0 right-0;
  @apply w-6 h-6 text-sm;

  transition-property: opacity, background-color;
  @apply ease-out duration-150;

  @media (hover: hover) {
    @apply opacity-10 focus:opacity-100 top-9 right-3;
    @apply w-8 h-8 b-2 rd-3 text-base shadow;
    @apply bg-popup active:bg-card;
  }
}
</style>
