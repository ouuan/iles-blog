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
    <div class="my-3 flex flex-wrap items-baseline gap-3">
      <span
        v-for="{ tag, count } of tagsSortedWithCount"
        :key="tag"
        class="flex items-center"
        :style="{ fontSize: `${Math.log(count) / 6 + 0.95}rem` }"
      >
        <span class="i-mdi-tag-outline" />
        <a
          :href="`/tag/${tag}`"
          class="mx-1 hover:underline"
        >
          {{ tag }}
        </a>
        <span class="sr-only">使用了{{ count }}次</span>
        <sup
          class="text-sm"
          :title="`使用了${count}次`"
          aria-hidden="true"
        >
          {{ count }}
        </sup>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTagCountMap, useTags } from '~/composables/useTags';

const tags = useTags();
const tagCountMap = useTagCountMap();
const tagsSortedWithCount = computed(
  () => tags.value
    .map((tag) => ({
      tag,
      count: tagCountMap.value.get(tag) ?? 0,
    }))
    .reverse() // useful because of sort stability
    .sort(
      (lhs, rhs) => rhs.count - lhs.count,
    ),
);

const page = usePage();
page.frontmatter.description = computed(
  () => `标签列表：${tagsSortedWithCount.value.slice(0, 20).map(({ tag }) => tag).join('，')}……`,
);
</script>
