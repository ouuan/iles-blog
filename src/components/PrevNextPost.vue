<template>
  <nav
    v-if="currentPostIndex !== -1"
    class="my-6 flex justify-between gap-6 lg:text-justify print:hidden"
  >
    <div
      v-if="prevPost"
      class="flex-1 flex"
    >
      <a
        class="flex items-center gap-1 hover:text-hover"
        :href="prevPost.meta.href"
        :aria-label="`上一篇：${prevPost.frontmatter.title}`"
      >
        <span class="i-mdi-chevron-left" />
        <span class="break-anywhere">{{ prevPost.frontmatter.title }}</span>
      </a>
    </div>
    <div
      v-if="nextPost"
      class="flex-1 flex justify-end"
    >
      <a
        class="flex items-center gap-1 hover:text-hover"
        :href="nextPost.meta.href"
        :aria-label="`下一篇：${nextPost.frontmatter.title}`"
      >
        <span class="break-anywhere">{{ nextPost.frontmatter.title }}</span>
        <span class="i-mdi-chevron-right" />
      </a>
    </div>
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
