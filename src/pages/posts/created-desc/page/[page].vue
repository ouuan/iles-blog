<template layout="base">
  <div class="m-4 standard-card">
    <post-list-nav
      current="created-desc"
      :page-index="pageIndex"
    />
    <post-list
      sort="created-desc"
      :page-index="pageIndex"
      href-prefix="/posts/created-desc/page"
      title="文章列表: 最新创建"
    />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { usePageCount } from '~/composables/usePosts';

const pageCount = usePageCount({ perPage: 20 });

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
page.frontmatter.title = computed(() => `文章列表: 最新创建 - 第${props.pageIndex}页`);
page.frontmatter.canonical = computed(() => (props.pageIndex === 1 ? '/posts' : page.route.path));
</script>
