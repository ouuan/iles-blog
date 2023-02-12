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
        v-for="{ tag, count } of tagsSortedWithCount"
        :key="tag"
        :title="`标签: ${tag}  使用次数: ${count}`"
        class="flex items-center"
        :style="{ fontSize: `${Math.log(count) / 6 + 0.95}rem` }"
      >
        <span
          class="i-mdi-tag-outline"
          aria-label="标签"
        />
        <a
          :href="`/tag/${tag}`"
          class="hover:underline mx-1"
        >
          {{ tag }}
        </a>
        <sup
          class="text-sm"
          :aria-label="`使用了${count}次`"
        >{{ count }}</sup>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTags, useTagCountMap } from '~/composables/useTags';

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
page.frontmatter.description = computed(() => `文章标签列表：${tagsSortedWithCount.value.slice(0, 10).map(({ tag }) => tag).join('，')}……`);
</script>
