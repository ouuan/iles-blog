<template>
  <giscus-component
    :repo="site.repo"
    :repo-id="site.giscusRepoId"
    :category-id="site.giscusCategoryId"
    mapping="specific"
    :term="term"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="top"
    :theme="theme"
    lang="zh-CN"
    loading="lazy"
  />
</template>

<script setup lang="ts">
import GiscusComponent from '@giscus/vue';
import { computed } from 'vue';

import useTheme from '~/composables/useTheme';
import site from '~/site';

defineProps<{
  term: string;
}>();

const colorMode = useTheme();
const theme = computed(() => (colorMode.value === 'auto' ? 'preferred_color_scheme' : colorMode.value));
</script>
