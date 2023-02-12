<template>
  <div class="lg:hidden flex items-stretch">
    <a
      class="p-2 bghover flex items-center"
      href="/search"
      title="全站搜索"
    >
      <span class="text-xl i-mdi-magnify" />
    </a>
  </div>
  <form
    role="search"
    class="hidden lg:flex items-stretch justify-center"
  >
    <div class="flex items-center">
      <input
        v-model="pattern"
        class="w-48 px-3 py-1 bg-area rd-full"
        type="search"
        placeholder="关键词"
        aria-label="全站搜索"
        @keypress="onKeyPress"
      >
    </div>
    <a
      class="p-2 bghover flex items-center"
      :href="href"
      title="全站搜索"
    >
      <span class="text-xl i-mdi-magnify" />
    </a>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const pattern = ref('');
const href = computed(() => `/search?q=${pattern.value}`);

function onKeyPress(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault();
    window.location.href = href.value;
  }
}
</script>
