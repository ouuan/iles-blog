<template>
  <header>
    <h1
      class="mb-3 mt-6 text-center text-balance text-8"
      itemprop="headline"
    >
      <component
        :is="titleLink ? 'a' : 'span'"
        :class="[
          'inline-block font-serif break-anywhere',
          titleLink && 'relative post-title',
        ]"
        :href="titleLink ? href : undefined"
      >
        <search-result-highlight
          :text="frontmatter.title"
          :delimiter="highlightDelimiter"
        />
      </component>
    </h1>
    <div class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-footer md:text-sm">
      <span
        class="flex items-center"
        :title="`创建于 ${format(frontmatter.date, 'yyyy-MM-dd HH:mm:ss O')}`"
      >
        <span class="i-mdi-clock-plus-outline mr-1" />
        <span class="sr-only">创建于</span>
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
        <span class="i-mdi-clock-edit-outline mr-1" />
        <span class="sr-only">修改于</span>
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
        <span class="i-mdi-account-eye-outline mr-1" />
        <span class="sr-only">访问量</span>
        <visitor-count
          :href="href"
          :init="frontmatter.visitor"
        />
      </span>
      <span
        v-if="frontmatter.tags"
        class="flex flex-wrap justify-center gap-x-2 gap-y-1"
      >
        <span
          v-for="tag of frontmatter.tags"
          :key="tag"
          :title="`标签: ${removeDelimiter(tag)}`"
          class="flex items-center"
        >
          <span class="i-mdi-tag-outline mr-1" />
          <span class="sr-only">标签</span>
          <a
            :href="`/tag/${removeDelimiter(tag)}`"
            class="hover:underline"
          >
            <search-result-highlight
              :text="tag"
              :delimiter="highlightDelimiter"
              itemprop="keywords"
            />
          </a>
        </span>
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { format, formatISO } from 'date-fns';
import site from '~/site';

const props = withDefaults(defineProps<{
  frontmatter: ReturnType<typeof usePage>['frontmatter'];
  href: string;
  filename: string;
  titleLink?: boolean;
  highlightDelimiter?: string;
}>(), {
  titleLink: false,
  highlightDelimiter: undefined,
});

function removeDelimiter(str: string) {
  if (!props.highlightDelimiter) return str;
  return str.split(props.highlightDelimiter).join('');
}
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
