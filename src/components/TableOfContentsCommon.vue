<template>
  <div class="flex flex-wrap gap-2 justify-between items-center pr-5 pl-8 mb-3">
    <div class="flex items-center">
      <div
        id="__toc-title"
        class="text-xl font-bold"
      >
        文章目录
      </div>
      <button
        v-if="drawer"
        class="px-1 text-xl flex items-center"
        aria-label="关闭目录"
        aria-controls="__toc-drawer"
        @click="emit('close')"
      >
        <span class="i-mdi-close" />
      </button>
    </div>
    <div v-if="!isPlain">
      <label class="ml-auto flex gap-1 items-center">
        <span>显示全部</span>
        <input
          v-model="showAll"
          type="checkbox"
        >
      </label>
    </div>
  </div>
  <div
    ref="tocRoot"
    style="max-height: calc(100% - 2rem);"
    class="overflow-auto overscroll-contain pr-5 pl-8"
  >
    <table-of-contents-node
      :nodes="nodes"
      :show-all="showAll"
    />
  </div>
</template>

<script setup lang="ts">
import { Heading } from '@islands/headings';
import { ref } from 'vue';
import {
  useWindowScroll,
  useWindowSize,
  watchDebounced,
  watchThrottled,
} from '@vueuse/core';
import TOCNode from '~/types/TOCNode';

const props = defineProps<{
  headings: Heading[];
  drawer: boolean;
}>();
const emit = defineEmits<{
  (e: 'close'): void,
}>();

const { y: scrollY } = useWindowScroll();
const { height: windowHeight } = useWindowSize();

const showAll = ref(false);

const tocRoot = ref<any>();
const isPlain = ref(true);
const lastCurrentSlug = ref('');

function getTocNodes() {
  let minDistance = Infinity;
  let currentSlug = '';

  if (!import.meta.env.SSR) {
    props.headings.forEach(({ slug }) => {
      const top = document.getElementById(slug)?.getBoundingClientRect().top ?? -Infinity;
      const distance = top < windowHeight.value / 3 ? Math.abs(top) : top + 1e8;
      if (distance < minDistance) {
        minDistance = distance;
        currentSlug = slug;
      }
    });
  }
  lastCurrentSlug.value = currentSlug;

  const root: TOCNode = {
    level: 0,
    title: '',
    slug: '',
    open: true,
    current: false,
    children: [],
    parent: null,
  };
  let currentParent = root;
  let plain = true;
  props.headings.forEach(({ level, title, slug }) => {
    while (level <= currentParent.level && currentParent.parent) {
      currentParent = currentParent.parent;
    }
    let open = slug === currentSlug;
    if (!open && !import.meta.env.SSR) {
      const top = document.getElementById(slug)?.getBoundingClientRect().top;
      if (top && top > 0 && top < windowHeight.value) open = true;
    }
    const newNode: TOCNode = {
      level,
      title,
      slug,
      open,
      current: slug === currentSlug,
      children: [],
      parent: currentParent,
    };
    if (open) {
      for (let node = newNode; node.parent; node = node.parent) {
        node.parent.open = true;
      }
    }
    currentParent.children.push(newNode);
    if (currentParent.parent) plain = false;
    currentParent = newNode;
  });
  isPlain.value = plain;
  return root.children;
}
const nodes = ref(getTocNodes());
watchThrottled([scrollY, showAll, windowHeight], () => {
  nodes.value = getTocNodes();
}, { throttle: 100 });

watchDebounced([scrollY, showAll, windowHeight, lastCurrentSlug], () => {
  const tocItem = document.getElementById(`__toc-item-${lastCurrentSlug.value}`);
  if (tocItem && tocRoot.value) {
    const itemTop = tocItem.getBoundingClientRect().top;
    const rootRect = tocRoot.value.getBoundingClientRect();
    const percent = (itemTop - rootRect.top) / rootRect.height;
    if (percent < 0.2 || percent > 0.8) {
      tocRoot.value.scrollTop += itemTop - rootRect.top - rootRect.height / 2;
    }
  }
}, { debounce: 50 });
</script>
