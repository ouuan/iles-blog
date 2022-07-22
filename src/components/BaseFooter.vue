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
    <footer-dynamic-part client:load />
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
import useCopyrightYear from '~/composables/useCopyrightYear';

const { site } = usePage();
const { author } = site;
const yearString = useCopyrightYear();
</script>
