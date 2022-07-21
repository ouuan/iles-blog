<template>
  <meta
    itemprop="mainEntityOfPage"
    :content="url"
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  href: string;
}>();
const { site } = usePage();
const url = new URL(props.href, site.url).href;
</script>
