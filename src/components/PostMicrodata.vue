<template>
  <div
    class="hidden"
    itemprop="author"
    itemscope
    itemtype="https://schema.org/Person"
  >
    <meta
      itemprop="additionalName"
      :content="site.author"
    >
    <meta
      itemprop="givenName"
      :content="site.firstName"
    >
    <meta
      itemprop="familyName"
      :content="site.lastName"
    >
    <meta
      itemprop="url"
      :content="site.authorLink"
    >
    <link
      v-if="GENDER[site.gender]"
      itemprop="gender"
      :href="`https://schema.org/${GENDER[site.gender]}`"
    >
    <meta
      v-else
      itemprop="gender"
      :content="site.gender"
    >
    <meta
      itemprop="image"
      content="/android-chrome-512x512.png"
    >
  </div>
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
import { Post } from '~/composables/usePosts';

const { site } = usePage();

const props = defineProps<{
  post: Post | ReturnType<typeof usePage>;
}>();

const url = new URL(props.post.meta.href, site.url).href;

const image = new URL(props.post.frontmatter.image, site.url).href;

const GENDER = {
  male: 'Male',
  female: 'Female',
} as Record<string, string | undefined>;
</script>
