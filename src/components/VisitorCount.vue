<template>
  <span
    class="flex items-center"
    title="访问量"
  >
    <span class="i-mdi-eye-outline mr-1" />
    <span
      v-if="Number.isInteger(visitorCount)"
      class="text-sm"
    >
      {{ visitorCount }}
    </span>
    <span
      v-else
      class="i-mdi-loading motion-safe:animate-spin"
    />
  </span>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{ href: string }>();

const visitorCount = ref<number | null>(null);

onMounted(async () => {
  try {
    const res = await fetch(
      new URL(
        `/api/visitors/${encodeURIComponent(props.href.slice(1))}`,
        'https://blog-visitor-count.ouuan.moe',
      ).href,
    );
    if (res.status === 200) {
      const data = await res.json();
      visitorCount.value = data.visitors;
    }
  } catch (e) {
    visitorCount.value = null;
  }
});
</script>
