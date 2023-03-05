<template>
  <div class="m-4 flex flex-col gap-6">
    <div class="flex flex-wrap gap-x-5 gap-y-2">
      <form
        role="search"
        class="max-w-100 flex grow items-center gap-2"
      >
        <label
          class="flex items-center"
          for="__search_keywords"
        >
          <span class="i-mdi-magnify text-xl" />
          <span class="sr-only">搜索关键词</span>
        </label>
        <input
          id="__search_keywords"
          v-model="params.q"
          class="w-full rd-1 bg-card p-1"
          type="search"
          placeholder="关键词"
        >
      </form>
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
        <template v-if="result.meta">
          <div
            v-if="(result.score ?? 1) < 0.1 || showMore"
            class="standard-card"
          >
            <post-head
              title-link
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
            <pre class="mb-3 mt-6 max-h-72 overflow-auto whitespace-pre-wrap"><span
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

const config = {
  includeScore: true,
  ignoreLocation: true,
  useExtendedSearch: true,
  fieldNormWeight: 0.2,
};

const fuse = new Fuse(props.data, {
  ...config,
  threshold: 0.4,
  includeMatches: true,
  keys: [{ name: 'title', weight: 2 }, 'content', 'tags'],
});

const params = useUrlSearchParams('history');
const pattern = computed(() => (Array.isArray(params.q) ? params.q.join(' ') : params.q)?.trim());

interface MatchPart {
  type: 'miss' | 'exact' | 'fuzzy' | 'ellipsis';
  content: string;
}

const TITLE = {
  miss: '未匹配',
  fuzzy: '模糊匹配',
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

function matchType(content: string) {
  if (pattern.value === undefined) return 'fuzzy';
  const result = new Fuse([content], config).search(pattern.value);
  const score = result[0]?.score;
  return score !== undefined && score < 0.002 ? 'exact' : 'fuzzy';
}

function search() {
  if (!pattern.value) return null;
  return fuse.search(pattern.value, {
    limit: 20,
  }).map((result) => {
    const { refIndex, score } = result;
    const meta = props.meta[refIndex];
    if (!meta) return {};
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
        ([start, end]) => matchType(value.slice(start, end + 1)) === 'exact',
      );
      if (indices.length === 0) indices = match.indices.slice();
      indices.sort((lhs, rhs) => lhs[0] - rhs[0]);
      let parts: MatchPart[] = [];
      const firstIndices = indices[0];
      if (!firstIndices) return;
      let last = match.key === 'title' ? 0 : Math.max(0, firstIndices[0] - CONTEXT_LENGTH);
      indices.forEach(([start, end]) => {
        if (start - last > CONTEXT_LENGTH * 3) {
          parts.push({ type: 'miss', content: value.slice(last, last + CONTEXT_LENGTH) });
          parts.push({ type: 'ellipsis', content: '\n\n……\n\n' });
          parts.push({ type: 'miss', content: value.slice(start - CONTEXT_LENGTH, start) });
        } else {
          parts.push({ type: 'miss', content: value.slice(last, start) });
        }
        const content = value.slice(Math.max(last, start), end + 1);
        parts.push({ type: matchType(content), content });
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
