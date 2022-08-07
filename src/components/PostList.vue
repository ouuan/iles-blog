<template>
  <div class="my-3 flex flex-wrap items-baseline gap-x-6 gap-y-1">
    <h1
      class="text-6 font-bold font-serif"
      :title="description"
      itemprop="headline"
    >
      {{ title }}
    </h1>
    <span class="mr-2">共 {{ postCount }} 篇文章</span>
  </div>
  <ol class="my-6 flex flex-col gap-6 b-l-4 b-area">
    <li
      v-for="post of posts"
      :key="post.meta.href"
    >
      <a
        class="flex items-center gap-1 relative pl-4 group
               b-b-2 b-area hover:b-footer transition-colors ease-out b-dotted"
        :href="post.meta.href"
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <span
          class="absolute left--5px w-6px h-6px rd-3px
                 bg-gray-5 dark:bg-gray-10 group-hover:bg-text transition-colors ease-out"
        />
        <post-microdata :post="post" />
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
          itemprop="headline"
          class="font-serif text-lg inline-block pl-2"
        >
          {{ post.frontmatter.title }}
        </span>
        <span
          v-if="displayVisitor"
          :title="`访问量: ${post.frontmatter.visitor}`"
        >
          ({{ post.frontmatter.visitor }})
        </span>
      </a>
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
import {
  usePageCount,
  usePostCount,
  usePosts,
  Post,
} from '~/composables/usePosts';

const props = withDefaults(defineProps<{
  sort?: 'created-desc' | 'updated-desc' | 'visitor-desc';
  pageIndex: number;
  filter?: (post: Post) => boolean;
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
