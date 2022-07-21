<template>
  <div class="my-3 flex flex-wrap items-baseline gap-x-6 gap-y-1">
    <h1
      class="text-6 font-bold font-main"
      :title="description"
      itemprop="headline"
    >
      {{ title }}
    </h1>
    <span class="mr-2">共 {{ postCount }} 篇文章</span>
  </div>
  <ol class="my-3 flex flex-col gap-1">
    <li
      v-for="post of posts"
      :key="post.meta.href"
      class="flex items-center gap-1 relative hover:left-2"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <microdata-author />
      <time
        class="text-footer"
        :datetime="formatISO(post.frontmatter[displayTime])"
        :title="`${displayTime === 'date' ? '创建' : '修改'}于 ${
          format(post.frontmatter[displayTime], 'yyyy-MM-dd HH:mm:ss')
        }`"
        :itemprop="displayTime === 'date' ? 'dateCreated' : 'dateModified'"
      >
        {{ format(post.frontmatter[displayTime], 'yyyy-MM-dd') }}
      </time>
      <span
        class="article-style"
        itemprop="headline"
      >
        <a
          class="text-lg inline-block pl-2"
          :href="post.meta.href"
        >
          {{ post.frontmatter.title }}
        </a>
      </span>
      <span
        v-if="displayVisitor"
        :title="`访问量: ${post.frontmatter.visitor}`"
      >
        ({{ post.frontmatter.visitor }})
      </span>
    </li>
  </ol>
  <pagination-bar
    :current-page="pageIndex"
    :page-count="pageCount"
    :href-prefix="hrefPrefix"
    class="my-3"
  />
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { format, formatISO } from 'date-fns';
import { usePageCount, usePostCount, usePosts } from '~/composables/usePosts';

const props = withDefaults(defineProps<{
  sort?: 'created-desc' | 'updated-desc' | 'visitor-desc';
  pageIndex: number;
  filter?: (post: ReturnType<typeof useDocuments<unknown>>['value'][number]) => boolean;
  perPage?: number;
  displayTime?: 'date' | 'lastUpdated';
  hrefPrefix: string;
  title: string;
  description?: string;
  displayVisitor?: boolean;
}>(), {
  sort: 'created-desc',
  filter: () => true,
  perPage: 25,
  displayTime: 'date',
  description: undefined,
  displayVisitor: false,
});

const propRefs = toRefs(props);

const posts = usePosts(propRefs);
const postCount = usePostCount(propRefs.filter);
const pageCount = usePageCount(propRefs);
</script>
