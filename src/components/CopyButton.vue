<template>
  <button
    ref="buttonRef"
    style="display:none;"
    class="copy-button"
    @click="copy"
  >
    <span
      v-if="state === 'normal'"
      title="复制到剪贴板"
      class="b-footer text-footer"
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
  <span
    class="absolute left-100vw"
    role="status"
  >
    <span v-if="state === 'success'">复制成功</span>
    <span v-else-if="state === 'error'">复制失败</span>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const buttonRef = ref<HTMLElement | null>(null);
const state = ref<'normal' | 'success' | 'error'>('normal');
let timeout: NodeJS.Timeout;

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
  @media screen {
    @apply important-block; // hide it in print and in places without stylesheet
  }

  @apply absolute top-0 right-0;

  @media (hover: hover) {
    @apply transition-opacity ease-out opacity-10 top-9 right-3;
  }

  & > span {
    @apply flex justify-center items-center;
    @apply w-6 h-6 text-sm;

    @media (hover: hover) {
      @apply w-8 h-8 b-2 rd-3 text-base shadow;
      @apply bg-popup active:bg-card transition-colors ease-out;
    }
  }
}
</style>
