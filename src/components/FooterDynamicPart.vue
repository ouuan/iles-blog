<template>
  <div class="grow flex flex-wrap justify-center items-center gap-x-1">
    <span>本站已生存了 {{ age }}</span>
    <span class="i-mdi-circle-small" />
    <span>
      共有
      <visitor-count />
      位访客
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { intervalToDuration, formatDuration } from 'date-fns';
import zhCN from 'date-fns/locale/zh-CN/index';

import site from '~/site';

const { startedAt } = site;

const age = computed(() => {
  const interval = intervalToDuration({
    start: startedAt,
    end: new Date(),
  });
  return formatDuration(interval, {
    format: ['years', 'months', 'days'],
    locale: zhCN,
  });
});
</script>
