<page>
path: /tag/[tag]/[filename]
</page>

<template>
  <render-feed
    :format="format"
    :options="options"
    :items="items"
  />
</template>

<script lang="ts">
import { useTags } from '~/composables/useTags';
import useFeed from '~/composables/useFeed';

const tags = useTags();

export default definePageComponent({
  getStaticPaths() {
    return ['rss', 'atom'].flatMap((format) => tags.value.map((tag) => ({
      params: { tag, filename: format === 'rss' ? 'feed.xml' : 'feed.atom' },
      props: { tag, format },
    })));
  },
});
</script>

<script setup lang="ts">
const props = defineProps<{
  tag: string;
  format: 'rss' | 'atom';
}>();

const { options, items } = useFeed(props.tag);
</script>
