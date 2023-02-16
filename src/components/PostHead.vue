<template>
  <header>
    <h1
      class="mt-6 mb-3 text-8 text-center"
      itemprop="headline"
    >
      <component
        :is="titleLink ? 'a' : 'span'"
        :class="[
          'inline-block font-serif break-anywhere',
          titleLink && 'relative post-title'
        ]"
        :href="titleLink ? href : undefined"
      >
        <slot name="title">
          {{ frontmatter.title }}
        </slot>
      </component>
    </h1>
    <div class="flex flex-wrap justify-center text-footer gap-x-4 gap-y-1 md:text-sm">
      <span
        class="flex items-center"
        :title="`创建于 ${format(frontmatter.date, 'yyyy-MM-dd HH:mm:ss O')}`"
      >
        <span
          class="i-mdi-folder-plus-outline mr-1"
          aria-label="创建于"
        />
        <a
          class="hover:underline"
          :href="`https://github.com/${site.repo}/blob/${site.branch}/${filename}?plain=1`"
        >
          <time
            :datetime="formatISO(frontmatter.date)"
            itemprop="dateCreated"
          >
            {{ format(frontmatter.date, 'yyyy-MM-dd') }}
          </time>
        </a>
      </span>
      <span
        class="flex items-center"
        :title="`修改于 ${format(frontmatter.lastUpdated, 'yyyy-MM-dd HH:mm:ss O')}`"
      >
        <span
          class="i-mdi-update mr-1"
          aria-label="修改于"
        />
        <a
          class="hover:underline"
          :href="`https://github.com/${site.repo}/commits/${site.branch}/${filename}`"
        >
          <time
            :datetime="formatISO(frontmatter.lastUpdated)"
            itemprop="dateModified"
          >
            {{ format(frontmatter.lastUpdated, 'yyyy-MM-dd') }}
          </time>
        </a>
      </span>
      <span
        class="flex items-center"
        title="访问量"
      >
        <span
          class="i-mdi-eye-outline mr-1"
          aria-label="访问量"
        />
        <visitor-count
          :href="href"
          :init="frontmatter.visitor"
        />
      </span>
      <span
        v-if="frontmatter.tags"
        :class="['flex flex-wrap justify-center gap-x-2 gap-y-1', tagMatched && 'fuzzy-matched']"
      >
        <span
          v-for="tag of frontmatter.tags"
          :key="tag"
          :title="`标签: ${tag}`"
          class="flex items-center"
          itemprop="keywords"
        >
          <span
            class="i-mdi-tag-outline mr-1"
            aria-label="标签"
          />
          <a
            :href="`/tag/${tag}`"
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
  titleLink?: boolean;
}>(), {
  tagMatched: false,
  titleLink: true,
});
</script>

<style lang="scss" scoped>
.post-title::before {
  content: '';
  @apply absolute h-1px bottom--5px left-51% right-51%;
  @apply bg-text;
  transition-property: left, right;
  @apply ease-out motion-safe:duration-200;
}

.post-title:hover::before {
  left: 0;
  right: 0;
}
</style>
