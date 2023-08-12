<template>
  <div class="flex items-stretch lg:hidden">
    <a
      class="flex items-center p-2 bghover"
      href="/search"
      title="全站搜索"
    >
      <span class="i-mdi-magnify text-xl" />
    </a>
  </div>
  <form
    role="search"
    class="hidden items-stretch justify-center lg:flex"
  >
    <div class="flex items-center">
      <input
        v-model="pattern"
        class="w-48 rd-full bg-area px-3 py-1"
        type="search"
        placeholder="关键词"
        aria-label="全站搜索"
        @keypress="onKeyPress"
      >
    </div>
    <a
      class="flex items-center p-2 bghover"
      :href="href"
      title="全站搜索"
    >
      <span class="i-mdi-magnify text-xl" />
    </a>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const pattern = ref('');
const href = computed(() => `/search?${new URLSearchParams({ q: pattern.value })}`);

function onKeyPress(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault();
    window.location.href = href.value;
  }
}
</script>
