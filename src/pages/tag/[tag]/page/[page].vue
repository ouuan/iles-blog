<template layout="base">
  <div class="m-3 standard-card">
    <post-list
      sort="created-desc"
      :filter="(post) => post.tags?.includes(tag)"
      :page-index="pageIndex"
      :href-prefix="`/tag/${tag}/page`"
      :title="`标签: ${tag}`"
    />
  </div>
</template>

<script lang="ts">
import { usePageCount } from '~/composables/usePosts';
import { useTags } from '~/composables/useTags';

const tags = useTags();

export default definePageComponent({
  getStaticPaths() {
    return tags.value.reduce((pages, tag) => {
      const pageCount = usePageCount({
        perPage: 25,
        filter: (post) => post.tags?.includes(tag),
      });
      for (let i = 1; i <= pageCount.value; i += 1) {
        pages.push({
          params: {
            tag,
            page: i.toString(),
          },
          props: {
            tag,
            pageIndex: i,
          },
        });
      }
      return pages;
    }, [] as any[]);
  },
});
</script>

<script setup lang="ts">
const props = defineProps<{
  pageIndex: number;
  tag: string;
}>();

const page = usePage();
page.frontmatter.title = `标签: ${props.tag} - 第${props.pageIndex}页`;
</script>
