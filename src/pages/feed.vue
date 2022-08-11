<page>
path: /[filename]
</page>

<template>
  <render-feed
    :format="format"
    :options="options"
    :items="items"
  />
</template>

<script lang="ts">
import useFeed from '~/composables/useFeed';

export default definePageComponent({
  getStaticPaths() {
    return ['rss', 'atom', 'json'].map((format) => ({
      params: { filename: format === 'rss' ? 'feed.xml' : `feed.${format}` },
      props: { format },
    }));
  },
});
</script>

<script setup lang="ts">
defineProps<{
  format: 'rss' | 'atom' | 'json';
}>();

const { options, items } = useFeed();
</script>
