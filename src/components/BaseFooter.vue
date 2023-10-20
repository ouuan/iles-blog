<template>
  <footer
    class="flex flex-col gap-1 bg-card p-6 text-footer"
    itemprop="hasPart"
    itemscope
    itemtype="https://schema.org/WPFooter"
  >
    <div class="flex flex-wrap items-center justify-center gap-x-1">
      <span>Copyright ©</span>
      <span>{{ yearString }}</span>
      <a
        class="flex items-center"
        href="/sponsor"
        title="赞赏支持"
      >
        <span class="i-mdi-heart text-red dark:text-red-7" />
      </a>
      <span>{{ author }}</span>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-x-1 print:hidden">
      <span>
        当前有
        <visitor-count-realtime client:idle />
        人在线
      </span>
      <span class="i-mdi-circle-small" />
      <span title="实际上，为了保护用户隐私，同一用户的多次访问只有在同一天内使用同一浏览器在同一ip下才会被算作同一人">
        共有
        <visitor-count client:idle />
        人到访过这里
      </span>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-x-1 print:hidden">
      基于
      <a
        class="underline"
        href="https://github.com/ElMassimo/iles"
      >îles</a>
      <a
        class="underline"
        href="https://github.com/ouuan/iles-blog/blob/master/package.json"
      >等项目</a>
      <span class="i-mdi-circle-small" />
      <span>由 ouuan 设计/制作</span>
      <span class="i-mdi-circle-small" />
      <a
        class="underline"
        href="https://github.com/ouuan/iles-blog"
      >源代码</a>
    </div>
  </footer>
  <meta
    itemprop="copyrightYear"
    :content="yearString"
  >
  <author-microdata itemprop="copyrightHolder" />
</template>

<script setup lang="ts">
import useCopyrightYear from '~/composables/useCopyrightYear';

const { site } = usePage();
const { author } = site;
const yearString = useCopyrightYear();
</script>
