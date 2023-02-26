<template>
  <div
    class="my-6 b-l-6 b-gray-4 bg-area p-6 shadow dark:b-gray-11"
    itemprop="copyrightNotice"
  >
    <ul class="flex flex-col gap-1">
      <li class="flex gap-1">
        <span class="shrink-0">文章作者:</span>
        <a
          :href="page.site.authorLink"
          rel="author"
        >{{ page.site.author }}</a>
      </li>
      <li class="flex gap-1">
        <span class="shrink-0">原文链接:</span>
        <a
          :href="url"
          rel="canonical"
          class="break-all"
        >{{ url }}</a>
      </li>
      <li class="flex gap-1">
        <span class="shrink-0">许可协议:</span>
        <span>
          本文采用
          <span class="article-style">
            <a
              rel="license"
              href="http://creativecommons.org/licenses/by-sa/4.0/deed.zh"
              class="font-sans"
              itemprop="license"
            >CC BY-SA 4.0</a>
          </span>
          许可协议进行授权，未满足
          <span
            class="underline decoration-dotted"
            title="简而言之，转载时必须标明出处（本文的链接），标明是转载而非原创，标明作了哪些修改，并使用相同的许可协议，但无需私信征求许可"
          >许可协议要求</span>
          不得转载。
        </span>
      </li>
      <li
        v-if="notice"
        class="flex gap-1"
      >
        <span class="shrink-0">额外说明:</span>
        <span>{{ notice }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const page = usePage();
const url = computed(() => new URL(page.meta.href, page.site.url).href);
const notice = computed(() => page.frontmatter.copyrightNotice);
</script>
