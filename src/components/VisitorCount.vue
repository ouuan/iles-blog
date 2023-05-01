<template>
  <span v-if="Number.isInteger(visitorCount)">
    {{ visitorCount }}
  </span>
  <span v-else-if="Number.isInteger(props.init)">
    {{ props.init }}
  </span>
  <span v-else>
    <span class="i-mdi-loading motion-safe:animate-spin" />
    <span class="sr-only">加载中</span>
  </span>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  href?: string;
  init?: number;
}>();

const visitorCount = ref<number | null>(null);

onMounted(async () => {
  try {
    const res = await fetch(
      new URL(
        props.href
          ? `/api/visitors/${encodeURIComponent(props.href.slice(1))}`
          : '/api/visitors',
        'https://blog-visitor-count.ouuan.moe',
      ).href,
    );
    if (res.status === 200) {
      const data: any = await res.json();
      visitorCount.value = data.visitors;
    }
  } catch (e) {
    visitorCount.value = null;
  }
});
</script>
