<!-- eslint-disable vue/no-v-html -->

<template>
  <ol>
    <li
      v-for="node of nodes"
      :id="`__toc-item-${node.slug}`"
      :key="node.slug"
      class="my-1 relative"
    >
      <a
        :class="['transition-color ease-out', node.current && 'text-link']"
        :href="`#${node.slug}`"
      >
        <span
          :class="`absolute top-1.2 left--4
                   motion-safe:transition-transform ease-out ${icon(node)}`"
        />
        <span v-html="node.title" />
      </a>
      <div
        v-if="(node.open || showAll) && node.children.length > 0"
        class="animate-appear pl-4 b-l-2 b-area"
      >
        <table-of-contents-node
          :nodes="node.children"
          :show-all="showAll"
        />
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import TOCNode from '~/types/TOCNode';

const props = defineProps<{
  nodes: TOCNode[];
  showAll: boolean;
}>();

function icon(node: TOCNode) {
  if (node.children.length === 0) return 'i-mdi-circle-medium';
  if (node.open || props.showAll) return 'i-mdi-chevron-right rotate-90';
  return 'i-mdi-chevron-right';
}
</script>

<style scoped lang="scss">
@media (prefers-reduced-motion: no-preference) {
  .animate-appear {
    animation: appear .15s cubic-bezier(0, 0, 0.2, 1);
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
