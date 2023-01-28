<template>
  <author-microdata itemprop="author" />
  <meta
    itemprop="mainEntityOfPage"
    :content="url"
  >
  <meta
    v-if="props.post.frontmatter.image"
    itemprop="image"
    :content="image"
  >
</template>

<script setup lang="ts">
import type { Post } from '~/composables/usePosts';

const { site } = usePage();

const props = defineProps<{
  post: Post | ReturnType<typeof usePage>;
}>();

const url = new URL(props.post.meta.href, site.url).href;

const image = new URL(props.post.frontmatter.image, site.url).href;
</script>
