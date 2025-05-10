<template layout="base">
  <div class="m-4 standard-card">
    <post-list
      sort="created-desc"
      :filter="filter"
      :page-index="pageIndex"
      :href-prefix="`/tag/${tag}/page`"
      :title="`标签: ${tag}`"
    />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { usePageCount } from '~/composables/usePosts';
import { useTagFilter, useTags } from '~/composables/useTags';

const tags = useTags();

export default definePageComponent({
  getStaticPaths() {
    return tags.value.reduce<any[]>((pages, tag) => {
      const pageCount = usePageCount({
        perPage: 20,
        filter: useTagFilter(tag),
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
    }, []);
  },
});
</script>

<script setup lang="ts">
const props = defineProps<{
  pageIndex: number;
  tag: string;
}>();

const filter = useTagFilter(props.tag);

const page = usePage();
page.frontmatter.title = computed(() => `标签: ${props.tag} - 第${props.pageIndex}页`);
page.frontmatter.canonical = computed(
  () => (props.pageIndex === 1 ? `/tag/${props.tag}` : page.route.path),
);

const title = `标签: ${props.tag} - ${page.site.title}`;
useHead({
  link: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: `/tag/${props.tag}/feed.xml`,
      title: `RSS Feed - ${title}`,
    },
    {
      rel: 'alternate',
      type: 'application/atom+xml',
      href: `/tag/${props.tag}/feed.atom`,
      title: `Atom Feed - ${title}`,
    },
    {
      rel: 'alternate',
      type: 'application/json',
      href: `/tag/${props.tag}/feed.json`,
      title: `JSON Feed - ${title}`,
    },
  ],
});
</script>
