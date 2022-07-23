<template>
  <div
    class="hidden"
    itemprop="author"
    itemscope
    itemtype="https://schema.org/Person"
  >
    <meta
      itemprop="name"
      :content="site.author"
    >
    <meta
      itemprop="url"
      :content="site.authorLink"
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
const { site } = usePage();

const props = defineProps<{
  post: ReturnType<typeof useDocuments<unknown>>['value'][number] | ReturnType<typeof usePage>;
}>();

const url = new URL(props.post.meta.href, site.url).href;

const image = new URL(props.post.frontmatter.image, site.url).href;
</script>
