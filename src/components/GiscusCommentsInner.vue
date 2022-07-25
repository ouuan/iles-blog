<template>
  <sponsor-request
    v-if="positiveReacted"
    click-to-open
  />
  <div
    v-if="loading"
    class="flex justify-center items-center gap-2"
  >
    <span>
      <a
        class="text-link hover:text-hover active:text-active"
        :href="`https://github.com/${repo}/discussions/categories/comments?discussions_q=${term}`"
      >评论</a>加载中…
    </span>
    <span class="i-mdi-loading motion-safe:animate-spin" />
  </div>
  <giscus-component
    :style="loading && {
      opacity: 0,
      position: 'absolute',
      zIndex: -1,
    }"
    :aria-hidden="loading"
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
    strict="1"
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

const loading = ref(true);
const positiveReacted = ref(false);

window.addEventListener('message', (event) => {
  if (event.origin !== 'https://giscus.app') return;
  const giscus = event.data?.giscus;
  if (typeof giscus !== 'object') return;
  loading.value = false;
  const reactions = giscus.discussion?.reactions;
  if (typeof reactions === 'object') {
    positiveReacted.value = Boolean([
      'THUMBS_UP',
      'LAUGH',
      'HOORAY',
      'HEART',
      'ROCKET',
    ].find((reaction) => reactions[reaction].viewerHasReacted));
  }
});
</script>
