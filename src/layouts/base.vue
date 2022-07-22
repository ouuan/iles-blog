<template>
  <nav-bar />
  <main
    class="container-margin py-6 min-h-100vh"
    itemprop="mainContentOfPage"
    itemscope
    itemtype="https://schema.org/WebPageElement"
  >
    <slot />
  </main>
  <base-footer />
  <back-to-top client:idle />
  <copy-button-adder />
  <plausible-trigger />
  <latex-post-process />
  <meta
    itemprop="inLanguage"
    content="zh-CN"
  >
</template>

<script setup lang="ts">
import { watch } from 'vue';

const { route } = usePage();

function checkRoute() {
  route.path.split('/').forEach((part) => {
    if (part !== encodeURIComponent(part)) {
      const error = `Route is not URI-encoding-invariable: ${route.path}`;
      // eslint-disable-next-line no-alert
      if (import.meta.env.DEV) alert(error);
      throw new Error(error);
    }
  });
}

checkRoute();
watch(route, checkRoute);
</script>
