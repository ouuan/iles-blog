<template>
  <div class="my-3 flex flex-wrap items-baseline gap-x-6 gap-y-1">
    <h1
      class="text-6 font-bold font-serif"
      :title="note"
      itemprop="headline"
    >
      {{ title }}
    </h1>
    <span class="mr-2">共 {{ postCount }} 篇文章</span>
  </div>
  <ol class="my-6 flex flex-col gap-4 b-l-4 b-area">
    <template
      v-for="(post, index) of posts"
      :key="post.meta.href"
    >
      <li
        v-if="sort !== 'visitor-desc' && isPostNewYear(index)"
        class="flex items-center relative pl-4 mt-2"
      >
        <span class="absolute left--6px w-8px h-8px rd-4px bg-gray-5 dark:bg-gray-10" />
        <span class="text-6 font-bold font-serif">
          {{ format(post.frontmatter[displayTime], 'yyyy') }}
        </span>
      </li>
      <li>
        <a
          class="flex items-center gap-3 relative pl-4 group
               py-1 b-b-2 b-area hover:b-footer transition-colors ease-out b-dotted"
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
            :class="[
              'text-footer shrink-0 tabular-nums',
              displayVisitor && 'hidden sm:inline-block'
            ]"
            :datetime="formatISO(post.frontmatter[displayTime])"
            :title="`${displayTime === 'date' ? '创建' : '修改'}于 ${
              format(post.frontmatter[displayTime], 'yyyy-MM-dd HH:mm:ss O')
            }`"
            :itemprop="displayTime === 'date' ? 'dateCreated' : 'dateModified'"
          >
            <span v-if="sort === 'visitor-desc'">
              {{ format(post.frontmatter[displayTime], 'yyyy-') }}
            </span>
            <span>
              {{ format(post.frontmatter[displayTime], 'MM-dd') }}
            </span>
          </time>
          <span
            itemprop="headline"
            class="font-serif text-lg inline-block break-anywhere"
          >
            {{ post.frontmatter.title }}
          </span>
          <span
            v-if="displayVisitor"
            class="ml-auto flex items-center"
            :title="`访问量: ${post.frontmatter.visitor}`"
          >
            <span class="i-mdi-eye-outline mr-1" />
            <span class="sr-only">访问量</span>
            <span>{{ post.frontmatter.visitor }}</span>
          </span>
        </a>
      </li>
    </template>
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
import useDescription from '~/composables/useDescription';
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
  note?: string;
  displayVisitor?: boolean;
}>(), {
  sort: 'created-desc',
  filter: () => true,
  perPage: 20,
  displayTime: 'date',
  note: undefined,
  displayVisitor: false,
});

const propRefs = toRefs(props);

const posts = usePosts(propRefs);
const postCount = usePostCount(propRefs.filter);
const pageCount = usePageCount(propRefs);

function isPostNewYear(index: number) {
  if (index === 0) return true;
  const current = posts.value[index];
  const previous = posts.value[index - 1];
  return current && previous
     && current.frontmatter[props.displayTime].getYear()
    !== previous.frontmatter[props.displayTime].getYear();
}

const page = usePage();
page.frontmatter.description = useDescription({
  posts,
  page: propRefs.pageIndex,
  lead: propRefs.title,
  dateType: propRefs.displayTime,
});
</script>
