<template>
  <div class="m-4 flex flex-col gap-6">
    <div class="flex flex-wrap gap-x-5 gap-y-2">
      <div class="grow max-w-100 flex items-center gap-2">
        <label
          class="i-mdi-magnify text-xl"
          aria-label="搜索关键词"
          for="__search_keywords"
        />
        <input
          id="__search_keywords"
          v-model="params.q"
          class="w-full p-1 bg-card rd-1"
          type="text"
          placeholder="关键词"
        >
      </div>
      <a
        class="flex items-center text-link"
        href="https://fusejs.io/examples.html#extended-search"
      >
        高级搜索语法
      </a>
      <div class="flex items-center gap-1">
        <input
          id="__search_showmore"
          v-model="showMore"
          type="checkbox"
        >
        <label
          for="__search_showmore"
        >显示匹配程度较低的结果</label>
      </div>
    </div>
    <template v-if="results && results.length">
      <template
        v-for="result of results"
        :key="`${pattern}-${result.refIndex}`"
      >
        <div
          v-if="(result.score ?? 1) < 0.1 || showMore"
          class="standard-card"
        >
          <post-head
            :href="result.meta.href"
            :filename="result.meta.filename"
            :frontmatter="result.meta.frontmatter"
            :tag-matched="result.tagMatched"
          >
            <template #title>
              <span
                v-for="(part, index) of result.titleParts"
                :key="index"
                :class="CLASS[part.type]"
                :title="TITLE[part.type]"
              >{{ part.content }}</span>
            </template>
          </post-head>
          <pre class="mt-6 mb-3 max-h-80vh overflow-auto whitespace-pre-wrap"><span
            v-for="(part, index) of result.contentParts"
            :key="index"
            :class="CLASS[part.type]"
            :title="TITLE[part.type]"
          >{{ part.content }}</span></pre>
        </div>
        <div
          v-else
          class="standard-card"
        >
          <p class="my-3">
            （匹配程度低，结果已隐藏）
          </p>
        </div>
      </template>
    </template>
    <div
      v-else-if="results"
      class="standard-card"
    >
      <p class="my-3">
        没有检索到任何结果 😢 要不试试缩短或者更换关键词？
      </p>
    </div>
    <div
      v-else
      class="standard-card"
    >
      <p class="my-3">
        请输入关键词进行搜索
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Fuse from 'fuse.js';
import { computed, ref } from 'vue';
import { useUrlSearchParams, watchDebounced } from '@vueuse/core';

const props = defineProps<{
  data: {
    title: string;
    content: string;
    tags: string;
  } [];
  meta: {
    frontmatter: ReturnType<typeof usePage>['frontmatter'];
    href: string;
    filename: string;
  } [];
}>();

const fuse = new Fuse(props.data, {
  includeScore: true,
  includeMatches: true,
  keys: [{ name: 'title', weight: 2 }, 'content', 'tags'],
  threshold: 0.4,
  ignoreLocation: true,
  useExtendedSearch: true,
  fieldNormWeight: 0.2,
});

const params = useUrlSearchParams('history');
const pattern = computed(() => (Array.isArray(params.q) ? params.q.join(' ') : params.q)?.trim());

interface MatchPart {
  type: 'miss' | 'exact' | 'fuzzy' | 'ellipsis';
  content: string;
}

const TITLE = {
  miss: '未匹配',
  fuzzy: '模糊匹配（或使用了高级搜索语法）',
  exact: '精确匹配',
  ellipsis: '省略',
};

const CLASS = {
  miss: 'text-footer',
  ellipsis: 'text-footer',
  fuzzy: 'fuzzy-matched',
  exact: 'exact-matched',
};

const CONTEXT_LENGTH = 50;

function search() {
  if (!pattern.value) return null;
  return fuse.search(pattern.value, {
    limit: 20,
  }).map((result) => {
    const { refIndex, score } = result;
    const meta = props.meta[refIndex];
    let titleParts: MatchPart[] = [{ type: 'miss', content: meta.frontmatter.title }];
    let contentParts: MatchPart[] = [{ type: 'miss', content: '' }];
    let tagMatched = false;
    result.matches?.forEach((match) => {
      if (match.key === 'tags') {
        tagMatched = true;
        return;
      }
      const { value } = match;
      if (!value) return;
      let indices: [number, number][] = match.indices.filter(
        ([start, end]) => value.slice(start, end + 1).toLowerCase() === pattern.value.toLowerCase(),
      );
      if (indices.length === 0) indices = match.indices.slice();
      indices.sort((lhs, rhs) => lhs[0] - rhs[0]);
      let parts: MatchPart[] = [];
      let last = match.key === 'title' ? 0 : Math.max(0, indices[0][0] - CONTEXT_LENGTH);
      indices.forEach(([start, end]) => {
        if (start - last > CONTEXT_LENGTH * 3) {
          parts.push({ type: 'miss', content: value.slice(last, last + CONTEXT_LENGTH) });
          parts.push({ type: 'ellipsis', content: '\n\n……\n\n' });
          parts.push({ type: 'miss', content: value.slice(start - CONTEXT_LENGTH, start) });
        } else {
          parts.push({ type: 'miss', content: value.slice(last, start) });
        }
        const content = value.slice(Math.max(last, start), end + 1);
        parts.push({ type: content === pattern.value ? 'exact' : 'fuzzy', content });
        last = Math.max(last, end + 1);
      });
      parts.push({
        type: 'miss',
        content: value.slice(last, match.key === 'title' ? value.length : last + CONTEXT_LENGTH),
      });
      parts = parts.filter(({ content }) => content);
      if (match.key === 'title') {
        titleParts = parts;
      } else if (match.key === 'content') {
        contentParts = parts;
      }
    });
    return {
      meta,
      titleParts,
      contentParts,
      refIndex,
      tagMatched,
      score,
    };
  });
}

const results = ref(search());

watchDebounced(pattern, () => {
  results.value = search();
}, { debounce: 300 });

const showMore = ref(false);
</script>
