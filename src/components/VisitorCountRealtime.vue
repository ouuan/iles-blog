<template>
  <span v-if="visitorCount !== null">
    {{ Math.max(1, visitorCount) }}
  </span>
  <span v-else>
    <span class="i-mdi-loading motion-safe:animate-spin" />
    <span class="sr-only">加载中</span>
  </span>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const visitorCount = ref<number | null>(null);

onMounted(async () => {
  try {
    const res = await fetch('https://blog-visitor-count.ouuan.moe/api/realtime');
    if (res.status === 200) {
      const data: any = await res.json();
      visitorCount.value = data.visitors;
    }
  } catch (e) {
    visitorCount.value = null;
  }
});
</script>
