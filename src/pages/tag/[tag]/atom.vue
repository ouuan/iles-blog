<page>
path: /tag/[tag]/feed.atom
</page>

<template>
  <render-feed
    format="atom"
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

const { options, items } = useFeed(props.tag);
</script>
