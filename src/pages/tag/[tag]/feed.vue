<page>
path: /tag/[tag]/[filename]
</page>

<template>
  <render-feed
    :format="format"
    :options="options"
    :items="items"
    :xml-prelude="xmlPrelude"
  />
</template>

<script lang="ts">
import useFeed from '~/composables/useFeed';
import { useTags } from '~/composables/useTags';
import xsl from '~/styles/rss.xsl?url'; // TODO: use `?no-inline` after upgrading Vite

const tags = useTags();

export default definePageComponent({
  getStaticPaths() {
    return ['rss', 'atom', 'json'].flatMap(
      (format) => [true, false].flatMap(
        (min) => tags.value.map((tag) => {
          const suffix = format === 'rss' ? 'xml' : format;
          const filename = min ? `feed.min.${suffix}` : `feed.${suffix}`;
          return {
            params: { tag, filename },
            props: { tag, format, min },
          };
        }),
      ),
    );
  },
});
</script>

<script setup lang="ts">
const props = defineProps<{
  tag: string;
  format: 'rss' | 'atom' | 'json';
  min: boolean;
}>();

const { options, items } = useFeed(props);

const withStyle = props.format === 'rss' && !props.min;
const xmlPrelude = withStyle ? `<?xml-stylesheet type="text/xsl" href="${xsl}"?>` : '';
</script>
