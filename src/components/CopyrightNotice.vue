<template>
  <div class="article-style my-5">
    <div
      class="flex justify-center flex-wrap-reverse gap-x-3 leading-8 mb-2"
      itemprop="copyrightNotice"
    >
      <span class="truncate">
        文章链接:
        <a
          :href="url"
          rel="canonical"
        >{{ url }}</a>
      </span>
      <span>
        作者:
        <a
          :href="page.site.authorLink"
          rel="author"
        >{{ page.site.author }}</a>
      </span>
    </div>
    <div class="flex flex-wrap justify-center items-center gap-2">
      <span>
        本文采用
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-sa/4.0/deed.zh"
          itemprop="license"
        >CC BY-SA 4.0</a>
        许可协议进行授权，未满足
        <span
          class="underline decoration-dotted"
          title="简而言之，转载时必须标明出处（本文的链接）并使用相同的许可协议，但无需私信征求许可"
        >许可协议要求</span>
        不得转载。
      </span>
      <span>
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-sa/4.0/deed.zh"
        >
          <img
            aria-label="CC BY-SA 4.0 Licence Picture"
            src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
          >
        </a>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const page = usePage();
const url = computed(() => new URL(page.meta.href, page.site.url).href);
</script>
