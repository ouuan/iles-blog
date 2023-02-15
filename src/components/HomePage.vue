<template>
  <div class="mx-4 flex flex-col gap-6">
    <div
      v-for="(post, index) of currentPagePosts"
      :key="post.meta.href"
      class="standard-card xl:px-24 2xl:px-30 3xl:px-36"
    >
      <article
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <post-microdata :post="post" />
        <post-head
          v-if="index < 3"
          client:load
          :href="post.meta.href"
          :filename="post.meta.filename"
          :frontmatter="post.frontmatter"
        />
        <post-head
          v-else
          client:idle
          :href="post.meta.href"
          :filename="post.meta.filename"
          :frontmatter="post.frontmatter"
        />
        <section
          class="article-style my-6"
          itemprop="abstract"
        >
          <component
            :is="post"
            excerpt
          />
        </section>
        <div class="flex justify-center my-3">
          <a
            class="btn btn-normal pl-2 pr-1"
            :href="post.meta.href"
          >
            <span>阅读更多</span>
            <span class="i-mdi-chevron-double-right" />
          </a>
        </div>
      </article>
    </div>
  </div>
  <pagination-bar
    :page-count="pageCount"
    :current-page="pageIndex"
    href-prefix="/page"
    class="mt-6"
  />
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { usePostListDescription } from '~/composables/useDescription';
import { usePosts, usePageCount } from '~/composables/usePosts';

const props = defineProps<{
  pageIndex: number;
}>();

const { pageIndex } = toRefs(props);
const currentPagePosts = usePosts({ pageIndex });
const pageCount = usePageCount();

const page = usePage();
page.frontmatter.description = usePostListDescription({
  posts: currentPagePosts,
  lead: `${page.site.description}最新文章`,
  page: pageIndex,
  dateType: 'date',
});
</script>
