<template>
  <footer
    class="flex flex-col text-footer bg-card p-6 gap-1"
    itemscope
    itemtype="https://schema.org/WPFooter"
  >
    <div class="flex flex-wrap justify-center gap-x-1">
      <span>Copyright ©</span>
      <span itemprop="copyrightYear">{{ yearString }}</span>
      <a
        class="flex items-center"
        href="/sponsor"
        title="赞赏支持"
      >
        <span class="i-mdi-heart text-red dark:text-red-7" />
      </a>
      <span
        itemprop="copyrightHolder"
        itemscope
        itemtype="https://schema.org/Person"
      >
        <span itemprop="name">{{ author }}</span>
      </span>
    </div>
    <div class="flex flex-wrap justify-center items-center gap-x-1">
      <span>文章总大小 {{ filesize(totalSize, { standard: 'iec', precision: 3 }) }}</span>
      <span class="i-mdi-circle-small" />
      <span title="实际上，为了保护用户隐私，同一用户的多次访问只有在同一天内使用同一浏览器在同一ip下才会被算作同一人">
        共有
        <visitor-count client:load />
        人到访过这里
      </span>
    </div>
    <div class="flex justify-center items-center flex-wrap gap-x-1">
      基于
      <a
        class="underline"
        href="https://github.com/ElMassimo/iles"
      >îles</a>
      及
      <a
        class="underline"
        href="https://github.com/ouuan/iles-blog/blob/master/package.json"
      >很多其他项目</a>
      <span class="i-mdi-circle-small" />
      <span>由 ouuan 设计/制作</span>
      <span class="i-mdi-circle-small" />
      <a
        class="underline"
        href="https://github.com/ouuan/iles-blog"
      >源代码</a>
      <span class="i-mdi-circle-small" />
      <a
        class="underline"
        href="https://github.com/ouuan/iles-blog/discussions"
      >Discussions</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import filesize from 'filesize';
import { usePosts } from '~/composables/usePosts';
import useCopyrightYear from '~/composables/useCopyrightYear';

const { site } = usePage();
const { author } = site;
const yearString = useCopyrightYear();

const posts = usePosts();
const totalSize = (await Promise.all(posts.value.map(async (post) => {
  if (import.meta.env.SSR) {
    const { readFile } = await import('fs/promises');
    const buffer = await readFile(post.meta.filename);
    return buffer.byteLength;
  }
  return 0;
}))).reduce((acc, size) => acc + size, 0);
</script>
