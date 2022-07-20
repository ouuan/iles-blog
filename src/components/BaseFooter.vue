<template>
  <footer class="flex flex-col items-center text-footer bg-card p-6 gap-1">
    <span class="flex items-center">
      <span>© {{ yearString }}</span>
      <span class="i-mdi-heart mx-1 inline-block text-red dark:text-red-7" />
      <span>{{ author }}</span>
    </span>
    <span>
      Powered by
      <a
        class="underline"
        href="https://github.com/ElMassimo/iles"
      >îles</a>
      and
      <a
        class="underline"
        href="https://github.com/ouuan/iles-blog/blob/master/package.json"
      >many more</a>
    </span>
    <span class="flex justify-center items-center flex-wrap">
      <span>Designed by
        <a
          class="underline"
          href="https://github.com/ouuan"
        >ouuan</a></span>
      <span class="inline-block i-mdi-circle-small relative top-0.2" />
      <a
        class="underline"
        href="https://github.com/ouuan/iles-blog"
      >Source Code</a>
      <span class="inline-block i-mdi-circle-small relative top-0.2" />
      <a
        class="underline"
        href="https://github.com/ouuan/iles-blog/discussions"
      >Discussions</a>
    </span>
  </footer>
</template>

<script setup lang="ts">
import useCopyrightYear from '~/composables/useCopyrightYear';

const { site } = usePage();
const { author } = site;
const yearString = useCopyrightYear();
</script>
