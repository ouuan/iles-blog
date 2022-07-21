<template>
  <div class="mx-3 flex flex-col gap-6">
    <div
      v-for="(post, index) of currentPagePosts"
      :key="post.meta.href"
      class="standard-card"
    >
      <article
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <microdata-main-entity-of-page :href="post.meta.href" />
        <microdata-author />
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
          class="article-style"
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
import { usePosts, usePageCount } from '~/composables/usePosts';

const props = defineProps<{
  pageIndex: number;
}>();

const { pageIndex } = toRefs(props);
const currentPagePosts = usePosts({ pageIndex });
const pageCount = usePageCount();
</script>
