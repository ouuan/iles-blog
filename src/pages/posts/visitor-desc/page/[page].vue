<template layout="base">
  <div class="m-4 standard-card">
    <post-list-nav
      current="visitor-desc"
      :page-index="pageIndex"
    />
    <post-list
      sort="visitor-desc"
      :page-index="pageIndex"
      href-prefix="/posts/visitor-desc/page"
      title="文章列表: 最多访问"
      :description="`数据更新于 ${format(new Date(), 'yyyy-MM-dd HH:mm')}，非实时更新，所以可能与当前实际访问量有一定差别`"
      display-visitor
    />
  </div>
</template>

<script lang="ts">
import { format } from 'date-fns';
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
page.frontmatter.title = `文章列表: 最多访问 - 第${props.pageIndex}页`;
</script>
