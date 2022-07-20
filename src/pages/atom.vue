<page>
path: /feed.atom
</page>

<template>
  <render-feed
    format="atom"
    :options="options"
    :items="items"
  />
</template>

<script setup lang="ts">
import useFeed from '~/composables/useFeed';

const { options, items } = useFeed();
</script>
