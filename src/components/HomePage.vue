<template>
  <div class="mx-4 flex flex-col gap-6">
    <div
      v-for="post of currentPagePosts"
      :key="post.meta.href"
      class="standard-card 2xl:px-30 3xl:px-36 xl:px-24"
    >
      <article
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <post-microdata :post="post" />
        <post-head
          client:idle
          title-link
          :href="post.meta.href"
          :filename="post.meta.filename"
          :frontmatter="post.frontmatter"
        />
        <section
          class="article-style my-6"
          itemprop="abstract"
          :lang="post.frontmatter.lang"
        >
          <component
            :is="post"
            excerpt
          />
        </section>
        <div class="my-3 flex justify-center">
          <a
            class="btn pl-2 pr-1 btn-normal"
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
import useDescription from '~/composables/useDescription';
import { usePageCount, usePosts } from '~/composables/usePosts';

const props = defineProps<{
  pageIndex: number;
}>();

const { pageIndex } = toRefs(props);
const currentPagePosts = usePosts({ pageIndex });
const pageCount = usePageCount();

const page = usePage();
page.frontmatter.description = useDescription({
  posts: currentPagePosts,
  lead: `${page.site.description}最新文章`,
  page: pageIndex,
  dateType: 'date',
});
</script>
