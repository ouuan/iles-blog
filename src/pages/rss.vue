<page>
path: /feed.xml
</page>

<template>
  <render-feed
    format="rss"
    :options="options"
    :items="items"
  />
</template>

<script setup lang="ts">
import useFeed from '~/composables/useFeed';

const { options, items } = useFeed();
</script>
