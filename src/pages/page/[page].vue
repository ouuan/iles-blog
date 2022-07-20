<template layout="base">
  <home-page :page-index="pageIndex" />
</template>

<script lang="ts">
import { usePageCount } from '~/composables/usePosts';

const pageCount = usePageCount();

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

useHead({ title: `首页 - 第${props.pageIndex}页 - ${site.title}` });
</script>
