<page>
title: 404 Not Found
</page>

<template layout="base">
  <Head>
    <meta
      name="robots"
      content="noindex"
    >
  </Head>
  <div class="mt-20 flex flex-col items-center gap-6">
    <span class="text-3xl">404 Not Found</span>
    <span class="text-lg">没有找到您要的页面诶 🤔</span>
    <span>要不再检查一下网址？</span>
    <div class="flex justify-center gap-6">
      <a
        class="btn px-2 btn-normal"
        href="javascript:history.go(-1);"
      >
        <span class="i-mdi-chevron-left" />
        <span class="mr-1">回到上一页</span>
      </a>
      <a
        class="btn px-2 btn-normal"
        href="/"
      >
        <span class="i-mdi-home" />
        <span class="mx-1">返回首页</span>
      </a>
    </div>
    <not-found-search client:load />
  </div>
</template>

<script client:idle lang="ts">
import { trackEvent } from '~/misc/plausible';

// eslint-disable-next-line import/prefer-default-export
export function onLoad() {
  trackEvent('404', {
    props: {
      path: window.location.pathname,
      href: window.location.href,
    },
  });
}
</script>
