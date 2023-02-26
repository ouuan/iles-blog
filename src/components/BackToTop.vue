<template>
  <button
    class="group bottom-10 flex-col floating-button"
    :title="toTop ? '回到顶部' : '前往底部'"
    @click="scroll"
  >
    <div
      :aria-hidden="!toTop"
      class="flex justify-center"
    >
      <span
        :class="[
          'i-mdi-chevron-double-up motion-safe:transition-font-size',
          toTop && 'text-5 group-hover:text-3',
          !toTop && 'text-0',
        ]"
      />
    </div>
    <div
      aria-hidden="true"
      class="text-0 group-hover:text-3.5 motion-safe:transition-font-size"
    >
      {{ scrollPercent }}
    </div>
    <div
      :aria-hidden="toTop"
      class="flex justify-center"
    >
      <span
        :class="[
          'i-mdi-chevron-double-down motion-safe:transition-font-size',
          !toTop && 'text-5 group-hover:text-3',
          toTop && 'text-0',
        ]"
      />
    </div>
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

function scroll() {
  window.scrollTo({
    top: toTop.value ? 0 : document.body.scrollHeight,
  });
}
</script>
