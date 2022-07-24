<template>
  <nav
    v-if="currentPostIndex !== -1"
    class="my-3 flex justify-between gap-6 sm:text-justify print:hidden"
  >
    <a
      v-if="prevPost"
      :href="prevPost.meta.href"
      class="flex-1 flex items-center gap-1"
      aria-label="上一篇"
    >
      <span class="i-mdi-chevron-left" />
      <span>{{ prevPost.frontmatter.title }}</span>
    </a>
    <a
      v-if="nextPost"
      :href="nextPost.meta.href"
      class="flex-1 flex justify-end items-center gap-1"
      aria-label="下一篇"
    >
      <span>{{ nextPost.frontmatter.title }}</span>
      <span class="i-mdi-chevron-right" />
    </a>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePosts } from '~/composables/usePosts';

const props = defineProps<{
  frontmatter: ReturnType<typeof usePage>['frontmatter'];
  meta: ReturnType<typeof usePage>['meta'];
}>();

const posts = usePosts();

const currentPostIndex = computed(
  () => posts.value.findIndex(({ meta }) => meta.href === props.meta.href),
);

const prevPost = computed(() => posts.value[currentPostIndex.value + 1]);
const nextPost = computed(() => posts.value[currentPostIndex.value - 1]);
</script>
