<template>
  <nav-bar />
  <main
    class="min-h-100vh py-6 page-container"
    itemprop="mainContentOfPage"
    itemscope
    itemtype="https://schema.org/WebPageElement"
  >
    <slot />
  </main>
  <base-footer />
  <back-to-top client:idle />
  <plausible-trigger />
  <text-justify-fix />
</template>
