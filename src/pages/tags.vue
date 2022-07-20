<page>
title: 标签列表
</page>

<template layout="base">
  <div class="m-3 standard-card">
    <h1 class="mt-3 text-6 font-bold font-main">
      标签列表
    </h1>
    <div class="flex flex-wrap items-baseline gap-3 my-3">
      <span
        v-for="tag of tagsSorted"
        :key="tag"
        :title="`标签: ${tag}  使用次数: ${tagCountMap.get(tag)}`"
        class="flex items-center"
        :style="{ fontSize: `${Math.log(tagCountMap.get(tag) || 1) / 3 + 0.95}rem` }"
      >
        <span class="i-mdi-tag-outline inline-block" />
        <a
          :href="`/tag/${encodeURIComponent(encodeURIComponent(tag))}`"
          class="hover:underline mx-1"
        >
          {{ tag }}
        </a>
        <sup class="text-sm">{{ tagCountMap.get(tag) }}</sup>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTags, useTagCountMap } from '~/composables/useTags';

const tags = useTags();
const tagCountMap = useTagCountMap();
const tagsSorted = computed(() => tags.value.slice().sort(
  (lhs, rhs) => (tagCountMap.value.get(rhs) ?? 0) - (tagCountMap.value.get(lhs) ?? 0),
));
</script>
