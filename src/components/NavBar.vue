<template>
  <header
    class="bg-card shadow print:hidden"
    itemprop="hasPart"
    itemscope
    itemtype="https://schema.org/WPHeader"
  >
    <div
      class="flex flex-wrap justify-center whitespace-nowrap px-4 page-container sm:flex-nowrap"
    >
      <div class="flex basis-full items-stretch justify-center sm:mr-3 sm:basis-auto">
        <a
          class="flex items-center p-3 text-xl font-serif bghover"
          href="/"
        >
          <span>ouuan<span class="mojikumi-narrow-left">’</span>s blog</span>
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
          <div class="flex items-stretch lg:hidden">
            <a
              class="flex items-center p-2 bghover"
              href="/search"
              title="站内搜索"
            >
              <span class="i-mdi-magnify text-xl" />
            </a>
          </div>
          <search-bar
            class="hidden lg:flex"
            client:load
          />
        </li>
        <li class="flex items-stretch">
          <a
            class="flex items-center p-2 bghover"
            href="/feed.xml"
            title="RSS 订阅"
          >
            <span class="i-mdi-rss text-xl" />
          </a>
        </li>
        <li class="flex">
          <theme-switcher client:idle />
        </li>
      </ul>
    </div>
  </header>
</template>
