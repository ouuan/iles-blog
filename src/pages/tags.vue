<page>
title: 标签列表
</page>

<template layout="base">
  <div class="m-4 standard-card">
    <div class="my-3 flex flex-wrap items-baseline gap-x-6 gap-y-1">
      <h1
        class="text-6 font-bold font-serif"
        itemprop="headline"
      >
        标签列表
      </h1>
      <span class="mr-2">共 {{ tags.length }} 个标签</span>
    </div>
    <div class="flex flex-wrap items-baseline gap-3 my-3">
      <span
        v-for="tag of tagsSorted"
        :key="tag"
        :title="`标签: ${tag}  使用次数: ${tagCountMap.get(tag)}`"
        class="flex items-center"
        :style="{ fontSize: `${Math.log(tagCountMap.get(tag) || 1) / 3 + 0.95}rem` }"
      >
        <span class="i-mdi-tag-outline" />
        <a
          :href="`/tag/${tag}`"
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
  (lhs, rhs) => (
    (tagCountMap.value.get(rhs) ?? 0) - (tagCountMap.value.get(lhs) ?? 0)
     || new Intl.Collator('zh-CN').compare(lhs, rhs)
  ),
));
</script>
