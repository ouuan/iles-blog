<!-- eslint-disable vue/no-v-html -->

<template>
  <ol>
    <li
      v-for="node of nodes"
      :id="`__toc-item-${node.slug}`"
      :key="node.slug"
      class="relative my-1"
    >
      <span
        :class="`absolute top-1.2 left--4
                   motion-safe:transition-transform ease-out ${icon[nodeType(node)]}`"
      />
      <span
        v-if="label[nodeType(node)]"
        class="sr-only"
      >{{ label[nodeType(node)] }}</span>
      <a
        :class="['transition-color ease-out', node.current && 'text-link']"
        :href="`#${node.slug}`"
      >
        <span v-html="node.title" />
      </a>
      <div
        v-if="(node.open || showAll) && node.children.length > 0"
        class="animate-appear b-l-2 b-area pl-4"
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
import type TOCNode from '~/types/TOCNode';

const props = defineProps<{
  nodes: TOCNode[];
  showAll: boolean;
}>();

function nodeType(node: TOCNode) {
  if (node.children.length === 0) {
    if (node.level === 6) return 'card';
    return 'leaf';
  }
  if (node.open || props.showAll) return 'open';
  return 'closed';
}

const icon = {
  card: 'i-mdi-square-medium',
  leaf: 'i-mdi-circle-medium',
  open: 'i-mdi-chevron-right rotate-90',
  closed: 'i-mdi-chevron-right',
};

const label = {
  card: '卡片',
  leaf: null,
  open: '已展开',
  closed: '已折叠',
};
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
