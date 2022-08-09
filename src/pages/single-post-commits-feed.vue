<page>
path: /[path]
</page>

<template>
  <render-feed
    :format="format"
    :options="options"
    :items="items"
  />
</template>

<script lang="ts">
import useCommitsFeed from '~/composables/useCommitsFeed';
import { usePosts, Post } from '~/composables/usePosts';

const posts = usePosts();

export default definePageComponent({
  getStaticPaths() {
    return ['rss', 'atom'].flatMap((format) => posts.value.map((post) => ({
      params: {
        path: `${post.meta.href.slice(1)}/commits.${format === 'rss' ? 'xml' : 'atom'}`,
      },
      props: { post, format },
    })));
  },
});
</script>

<script setup lang="ts">
const props = defineProps<{
  post: Post;
  format: 'rss' | 'atom';
}>();

const { options, items } = await useCommitsFeed(props.post);
</script>
