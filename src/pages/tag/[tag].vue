<template layout="base">
  <div class="m-3 standard-card">
    <post-list
      sort="created-desc"
      :filter="(post) => post.tags?.includes(tag)"
      :page-index="1"
      :href-prefix="`/tag/${encodeURIComponent(encodeURIComponent(tag))}/page`"
      :title="`标签: ${tag}`"
    />
  </div>
</template>

<script lang="ts">
import { useTags } from '~/composables/useTags';

const tags = useTags();

export default definePageComponent({
  getStaticPaths() {
    return tags.value.map((tag) => ({
      params: { tag },
      props: { tag },
    }));
  },
});
</script>

<script setup lang="ts">
defineProps<{
  tag: string;
}>();
</script>
