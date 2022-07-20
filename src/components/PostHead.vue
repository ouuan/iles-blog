<template>
  <header>
    <h1 class="mt-6 mb-3 text-8 text-center">
      <a
        class="post-title relative font-main"
        :href="href"
      >
        <slot name="title" />
        <span class="[&:nth-child(2)]:hidden">{{ frontmatter.title }}</span>
      </a>
    </h1>
    <div class="flex flex-wrap justify-center text-footer gap-x-4 gap-y-1 text-sm">
      <span
        class="flex items-center"
        :title="`创建于 ${format(frontmatter.date, 'yyyy-MM-dd HH:mm:ss')}`"
      >
        <span class="i-mdi-calendar-blank inline-block mr-1" />
        <a
          class="hover:underline"
          :href="`https://github.com/${site.repo}/blob/${site.branch}/${filename}?plain=1`"
        >
          <time :datetime="formatISO(frontmatter.date)">
            {{ format(frontmatter.date, 'yyyy-MM-dd') }}
            <relative-time :date="frontmatter.date" />
          </time>
        </a>
      </span>
      <span
        class="flex items-center"
        :title="`修改于 ${format(frontmatter.lastUpdated, 'yyyy-MM-dd HH:mm:ss')}`"
      >
        <span class="i-mdi-calendar-edit inline-block mr-1" />
        <component
          :is="frontmatter.commitHash ? 'a' : 'span'"
          :class="frontmatter.commitHash && 'hover:underline'"
          :href="frontmatter.commitHash && `https://github.com/${site.repo}/commit/${frontmatter.commitHash}`"
        >
          <time :datetime="formatISO(frontmatter.lastUpdated)">
            {{ format(frontmatter.lastUpdated, 'yyyy-MM-dd') }}
            <relative-time :date="frontmatter.lastUpdated" />
          </time>
        </component>
      </span>
      <visitor-count :href="href" />
      <span
        v-if="frontmatter.tags"
        :class="['flex flex-wrap gap-x-2 gap-y-1', tagMatched && 'fuzzy-matched']"
      >
        <span
          v-for="tag of frontmatter.tags"
          :key="tag"
          :title="`标签: ${tag}`"
          class="flex items-center"
        >
          <span class="i-mdi-tag-outline inline-block mr-1" />
          <a
            :href="`/tag/${encodeURIComponent(encodeURIComponent(tag))}`"
            class="hover:underline"
          >
            {{ tag }}
          </a>
        </span>
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { format, formatISO } from 'date-fns';
import site from '~/site';

withDefaults(defineProps<{
  frontmatter: ReturnType<typeof usePage>['frontmatter'];
  href: string;
  filename: string;
  tagMatched?: boolean;
}>(), {
  tagMatched: false,
});
</script>

<style lang="scss" scoped>
.post-title::before {
  content: '';
  position: absolute;
  height: 1px;
  bottom: -5px;
  left: 51%;
  right: 51%;
  background: var(--text-color);
  transition-duration: .2s;
  transition-property: left, right;
  transition-timing-function: ease-out;
}

.post-title:hover::before {
  left: 0;
  right: 0;
}
</style>
