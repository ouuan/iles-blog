<template>
  <ol>
    <li
      v-for="node of nodes"
      :id="`__toc-item-${node.slug}`"
      :key="node.slug"
      class="my-1 relative"
    >
      <a
        :class="['transition-color ease-in', node.current && 'text-link']"
        :href="`#${node.slug}`"
      >
        <span :class="`absolute top-1.2 left--4 ${icon(node)}`" />
        <span>{{ node.title }}</span>
      </a>
      <div
        v-if="(node.open || showAll) && node.children.length > 0"
        class="pl-4 b-l-2 b-area"
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
  if (node.open || props.showAll) return 'i-mdi-chevron-down';
  return 'i-mdi-chevron-right';
}
</script>
