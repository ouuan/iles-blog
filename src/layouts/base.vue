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
