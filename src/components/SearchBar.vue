<template>
  <form
    role="search"
    class="items-stretch justify-center"
  >
    <div class="flex items-center">
      <input
        v-model="pattern"
        class="w-48 rd-full bg-area px-3 py-1"
        type="search"
        placeholder="站内搜索"
        aria-label="站内搜索"
        @keypress="onKeyPress"
      >
    </div>
    <a
      class="flex items-center p-2 bghover"
      :href="href"
      title="搜索"
    >
      <span class="i-mdi-magnify text-xl" />
    </a>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
  initialPattern?: string;
}>(), {
  initialPattern: '',
});

const pattern = ref(props.initialPattern);
const href = computed(() => `/search?${new URLSearchParams({ q: pattern.value })}`);

function onKeyPress(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault();
    window.location.href = href.value;
  }
}
</script>
