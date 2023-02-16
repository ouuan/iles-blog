<template>
  <button
    v-if="toTop"
    class="btt-btn floating-button bottom-10"
    title="回到顶部"
    @click="scrollToTop"
  >
    <span class="btt-icon text-xl i-mdi-chevron-double-up" />
    <span class="btt-percent hidden">
      <span class="flex justify-center">
        <span class="text-xs i-mdi-chevron-double-up" />
      </span>
      <span class="sr-only">阅读进度</span>
      <span class="text-sm">
        {{ scrollPercent }}
      </span>
    </span>
  </button>
  <button
    v-else
    class="btt-btn floating-button bottom-10"
    title="前往底部"
    @click="scrollToBottom"
  >
    <span class="btt-icon text-xl i-mdi-chevron-double-down" />
    <span class="btt-percent hidden">
      <span class="sr-only">阅读进度</span>
      <span class="text-sm">
        {{ scrollPercent }}
      </span>
      <span class="flex justify-center">
        <span class="text-xs i-mdi-chevron-double-down" />
      </span>
    </span>
  </button>
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

const toTop = ref(false);
const scrollPercent = ref('');

watchThrottled([windowHeight, scrollY], () => {
  if (!import.meta.env.SSR) {
    const percent = (scrollY.value / (document.body.scrollHeight - windowHeight.value)) * 100;
    scrollPercent.value = `${percent.toFixed(0)}%`;
    toTop.value = scrollY.value >= windowHeight.value / 2 || percent > 50;
  }
}, {
  immediate: true,
  throttle: 100,
});

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
