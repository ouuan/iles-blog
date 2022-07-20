<template>
  <template v-if="display">
    <button
      v-if="scrollY >= windowHeight / 2"
      class="btt-btn floating-button bottom-10"
      title="回到顶部"
      aria-label="回到顶部"
      @click="scrollToTop"
    >
      <span class="btt-icon text-xl i-mdi-chevron-double-up" />
      <span class="btt-percent hidden">
        <span class="flex justify-center">
          <span class="text-xs i-mdi-chevron-double-up" />
        </span>
        <span
          class="text-sm"
          :aria-label="`阅读进度 ${scrollPercent}`"
        >
          {{ scrollPercent }}
        </span>
      </span>
    </button>
    <button
      v-else
      class="btt-btn floating-button bottom-10"
      title="前往底部"
      aria-label="前往底部"
      @click="scrollToBottom"
    >
      <span class="btt-icon text-xl i-mdi-chevron-double-down" />
      <span class="btt-percent hidden">
        <span
          class="text-sm"
          :aria-label="`阅读进度 ${scrollPercent}`"
        >
          {{ scrollPercent }}
        </span>
        <span class="flex justify-center">
          <span class="text-xs i-mdi-chevron-double-down" />
        </span>
      </span>
    </button>
  </template>
</template>

<script setup lang="ts">
import {
  watchThrottled,
  useWindowScroll,
  useWindowSize,
} from '@vueuse/core';
import { ref } from 'vue';

const { y: scrollY } = useWindowScroll();
const { height: windowHeight } = useWindowSize();

const display = ref(false);
const scrollPercent = ref('');

watchThrottled([windowHeight, scrollY], () => {
  display.value = document.body.scrollHeight >= windowHeight.value * 1.5;
  const percent = (scrollY.value / (document.body.scrollHeight - windowHeight.value)) * 100;
  scrollPercent.value = `${percent.toFixed(0)}%`;
}, { throttle: 100 });

function scrollToTop() {
  window.scrollTo({
    top: 0,
  });
}

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
  });
}
</script>

<style lang="scss" scoped>
.btt-btn:hover {
  .btt-icon {
    @apply hidden;
  }
  .btt-percent {
    @apply block;
  }
}
</style>
