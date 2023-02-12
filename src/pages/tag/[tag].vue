<template layout="base">
  <div class="m-4 standard-card">
    <post-list
      sort="created-desc"
      :filter="filter"
      :page-index="1"
      :href-prefix="`/tag/${tag}/page`"
      :title="`标签: ${tag}`"
      :description="`标签为“${tag}”的文章`"
    />
  </div>
</template>

<script lang="ts">
import { useTags, useTagFilter } from '~/composables/useTags';

const tags = useTags();

export default definePageComponent({
  getStaticPaths() {
    return tags.value.map((tag) => ({
      params: { tag },
      props: { tag },
    }));
  },
});
</script>

<script setup lang="ts">
const props = defineProps<{
  tag: string;
}>();

const filter = useTagFilter(props.tag);

const page = usePage();
page.frontmatter.title = `标签: ${props.tag}`;

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
