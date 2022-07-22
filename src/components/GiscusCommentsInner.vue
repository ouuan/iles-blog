<template>
  <sponsor-request
    v-if="positiveReacted"
    click-to-open
  />
  <giscus-component
    :repo="repo"
    :repo-id="repoId"
    :category-id="categoryId"
    mapping="specific"
    :term="term"
    reactions-enabled="1"
    emit-metadata="1"
    input-position="top"
    :theme="theme"
    lang="zh-CN"
    loading="lazy"
  />
</template>

<script setup lang="ts">
import GiscusComponent from '@giscus/vue';
import { computed, ref } from 'vue';

import useTheme from '~/composables/useTheme';
import site from '~/site';

const repo: `${string}/${string}` = import.meta.env.DEV ? 'ouuan/giscus-test' : site.repo;
const repoId = import.meta.env.DEV ? 'R_kgDOHsXSjg' : site.giscusRepoId;
const categoryId = import.meta.env.DEV ? 'DIC_kwDOHsXSjs4CQWK2' : site.giscusCategoryId;

defineProps<{
  term: string;
}>();

const colorMode = useTheme();
const theme = computed(() => (colorMode.value === 'auto' ? 'preferred_color_scheme' : colorMode.value));

const positiveReacted = ref(false);

window.addEventListener('message', (event) => {
  if (event.origin !== 'https://giscus.app') return;
  const reactions = event.data?.giscus?.discussion?.reactions;
  if (typeof reactions !== 'object') return;
  positiveReacted.value = Boolean([
    'THUMBS_UP',
    'LAUGH',
    'HOORAY',
    'HEART',
    'ROCKET',
  ].find((reaction) => reactions[reaction].viewerHasReacted));
});
</script>
