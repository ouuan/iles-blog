<template>
  <header
    class="bg-card shadow print:hidden"
    itemprop="hasPart"
    itemscope
    itemtype="https://schema.org/WPHeader"
  >
    <div
      class="page-container px-4 whitespace-nowrap
             flex flex-wrap sm:flex-nowrap justify-center"
    >
      <div class="flex basis-full sm:basis-auto items-stretch justify-center sm:mr-3">
        <a
          class="p-3 bghover font-serif text-xl flex items-center"
          href="/"
        >
          <span>ouuan<span class="font-latin">’</span>s blog</span>
        </a>
      </div>
      <nav class="flex">
        <ul class="flex">
          <nav-bar-item
            href="/"
            title="首页"
          />
          <nav-bar-item
            href="/posts"
            title="文章"
          />
          <nav-bar-item
            href="/tags"
            title="标签"
          />
          <nav-bar-item
            href="/about"
            title="关于"
          />
        </ul>
      </nav>
      <div class="sm:basis-full" />
      <ul class="flex">
        <li class="flex">
          <search-bar client:load />
        </li>
        <li class="flex items-stretch">
          <a
            class="p-2 bghover flex items-center"
            href="/feed.xml"
            title="RSS 订阅"
          >
            <span class="text-xl i-mdi-rss" />
          </a>
        </li>
        <li class="flex">
          <theme-switcher client:idle />
        </li>
      </ul>
    </div>
  </header>
</template>
