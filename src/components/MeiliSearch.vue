<template>
  <div class="m-4 flex flex-col gap-6">
    <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
      <form
        role="search"
        class="max-w-100 flex grow items-center gap-2"
      >
        <label
          class="flex items-center"
          for="__search_keywords"
        >
          <span
            :class="[
              'text-xl',
              pending ? 'i-mdi-loading motion-safe:animate-spin' : 'i-mdi-magnify',
            ]"
          />
          <span class="sr-only">搜索关键词</span>
        </label>
        <input
          id="__search_keywords"
          v-model="params.q"
          class="w-full rd-1 bg-card p-1"
          type="search"
          name="q"
          placeholder="关键词"
        >
      </form>
      <span>{{ hint }}</span>
    </div>
    <template v-if="searchResult && searchResult.hits.length">
      <div
        v-for="hit of searchResult.hits"
        :key="hit.href"
        class="standard-card"
      >
        <post-head
          title-link
          :frontmatter="hitToFrontmatter(hit)"
          :href="hit.href"
          :filename="hit.filename"
          :highlight-delimiter="delimiter"
        />
        <pre class="my-6 whitespace-pre-wrap"><search-result-highlight
          :text="hit._formatted.content.trim().replace(/\n{3,}/g, '\n\n')"
          :delimiter="delimiter"
        /></pre>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import { useUrlSearchParams, watchDebounced } from '@vueuse/core';

interface SearchResultHit {
  _formatted: {
    title: string;
    tags: string[];
    content: string;
  };
  href: string;
  filename: string;
  date: string;
  lastUpdated: string;
}

interface SearchResult {
  estimatedTotalHits: number;
  hits: SearchResultHit[];
}

const params = useUrlSearchParams('history');
const pattern = computed(() => (Array.isArray(params.q) ? params.q.join(' ') : params.q)?.trim());

const delimiter = `--${Math.random().toFixed(16)}--`;

// initially undefined, null on error
const searchResult = shallowRef<SearchResult | null>();

const pending = ref(false);

async function search() {
  return fetch(new URL('/indexes/blog-posts/search', import.meta.env.MEILI_URL), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.MEILI_SEARCH_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: pattern.value,
      attributesToRetrieve: ['href', 'filename', 'date', 'lastUpdated'],
      attributesToHighlight: ['title', 'tags', 'content'],
      attributesToCrop: ['content'],
      cropLength: 20,
      cropMarker: '\n\n……\n\n',
      highlightPreTag: delimiter,
      highlightPostTag: delimiter,
    }),
  });
}

watchDebounced(pattern, async () => {
  if (!pattern.value) {
    searchResult.value = undefined;
    return;
  }
  pending.value = true;
  try {
    const response = await search();
    if (!response.ok) {
      throw new Error();
    }
    searchResult.value = await response.json();
  } catch {
    searchResult.value = null;
  }
  pending.value = false;
}, { debounce: 300, immediate: true });

const hint = computed(() => {
  if (searchResult.value === undefined) {
    return '请输入关键词进行搜索 🧐';
  }
  if (searchResult.value === null) {
    return '搜索出错了 😵 重新试试？';
  }
  if (searchResult.value.hits.length === 0) {
    return '没有检索到任何结果 😢 试试缩短或更换关键词？';
  }
  return `共检索到 ${searchResult.value.estimatedTotalHits} 个结果`;
});

function hitToFrontmatter(hit: SearchResultHit) {
  return {

    title: hit._formatted.title,

    tags: hit._formatted.tags,
    date: new Date(hit.date),
    lastUpdated: new Date(hit.lastUpdated),
  };
}
</script>
