<template>
  <div class="lg:hidden flex items-stretch justify-center">
    <a
      class="p-2 bghover flex items-center"
      href="/search"
      title="搜索"
    >
      <span class="text-xl i-mdi-magnify" />
    </a>
  </div>
  <div class="hidden lg:flex items-stretch justify-center">
    <div class="flex items-center">
      <input
        id="__navbar_search_keywords"
        v-model="pattern"
        class="w-48 px-3 py-1 bg-area rd-4"
        type="text"
        placeholder="搜索"
        @keypress="onKeyPress"
      >
    </div>
    <label
      for="__navbar_search_keywords"
      class="flex items-stretch"
    >
      <a
        class="p-2 bghover flex items-center"
        :href="href"
        title="搜索"
      >
        <span class="text-xl i-mdi-magnify" />
      </a>
    </label>
  </div>
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
