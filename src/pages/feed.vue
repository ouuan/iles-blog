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
    return ['rss', 'atom', 'json'].flatMap(
      (format) => [true, false].map((min) => {
        const suffix = format === 'rss' ? 'xml' : format;
        const filename = min ? `feed.min.${suffix}` : `feed.${suffix}`;
        return {
          params: { filename },
          props: { format, min },
        };
      }),
    );
  },
});
</script>

<script setup lang="ts">
const props = defineProps<{
  format: 'rss' | 'atom' | 'json';
  min: boolean;
}>();

const { options, items } = useFeed(props);
</script>
