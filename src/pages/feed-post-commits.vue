<page>
path: /post/[path]
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
    return ['rss', 'atom', 'json'].flatMap((format) => posts.value.map((post) => ({
      params: {
        path: `${post.meta.href.slice(5)}/commits.${format === 'rss' ? 'xml' : format}`,
      },
      props: { post, format },
    })));
  },
});
</script>

<script setup lang="ts">
const props = defineProps<{
  post: Post;
  format: 'rss' | 'atom' | 'json';
}>();

const { options, items } = await useCommitsFeed(props.post);
</script>
