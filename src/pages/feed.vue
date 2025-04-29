<page>
path: /[filename]
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
import xsl from '~/styles/rss.xsl?url'; // TODO: use `?no-inline` after upgrading Vite

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

const withStyle = props.format === 'rss' && !props.min;
const xmlPrelude = withStyle ? `<?xml-stylesheet type="text/xsl" href="${xsl}"?>` : '';
</script>
