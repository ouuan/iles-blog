<template layout="base">
  <div class="m-3 standard-card">
    <post-list-nav
      current="updated-desc"
      :page-index="pageIndex"
    />
    <post-list
      sort="updated-desc"
      :page-index="pageIndex"
      href-prefix="/posts/updated-desc/page"
      display-time="lastUpdated"
      title="文章列表：最近修改"
    />
  </div>
</template>

<script lang="ts">
import { usePageCount } from '~/composables/usePosts';

const pageCount = usePageCount({ perPage: 25 });

export default definePageComponent({
  getStaticPaths() {
    return Array.from(Array(pageCount.value), (_, index) => ({
      params: { page: (index + 1).toString() },
      props: { pageIndex: index + 1 },
    }));
  },
});
</script>

<script setup lang="ts">
const props = defineProps<{
  pageIndex: number;
}>();

const page = usePage();
page.frontmatter.title = `文章列表：最近修改 - 第${props.pageIndex}页`;
</script>
