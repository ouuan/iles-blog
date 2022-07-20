<template layout="base">
  <div class="m-3 standard-card">
    <post-list-nav
      current="created-desc"
      :page-index="pageIndex"
    />
    <post-list
      sort="created-desc"
      :page-index="pageIndex"
      href-prefix="/posts/created-desc/page"
      title="文章列表：最新创建"
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

const { site } = usePage();

useHead({ title: `文章列表: 最新创建 - 第${props.pageIndex}页 - ${site.title}` });
</script>
