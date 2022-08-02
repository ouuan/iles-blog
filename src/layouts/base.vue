<template>
  <nav-bar />
  <main
    class="page-container py-6 min-h-100vh"
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
  <text-justify-fix />
  <meta
    itemprop="inLanguage"
    content="zh-CN"
  >
</template>
