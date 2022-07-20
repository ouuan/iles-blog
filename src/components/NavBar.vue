<template>
  <header
    class="bg-card shadow print:hidden"
    itemscope
    itemtype="http://schema.org/WPHeader"
  >
    <div
      class="container-margin px-3 whitespace-nowrap
             flex flex-wrap sm:flex-nowrap justify-center"
    >
      <h1 class="flex basis-full sm:basis-auto items-stretch justify-center sm:mr-3">
        <a
          class="p-3 hover:bg-bghover font-main text-xl flex items-center"
          href="/"
        >
          <span>ouuan's blog</span>
        </a>
      </h1>
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
        <li class="flex items-stretch justify-center">
          <a
            class="p-2 hover:text-hover hover:bg-bghover flex items-center"
            href="/search"
            title="搜索"
          >
            <span class="text-xl i-mdi-magnify" />
          </a>
        </li>
        <li class="flex items-stretch justify-center">
          <a
            class="p-2 hover:text-hover hover:bg-bghover flex items-center"
            href="/feed.xml"
            title="RSS 订阅"
          >
            <span class="text-xl i-mdi-rss" />
          </a>
        </li>
        <li class="flex">
          <theme-switcher client:load />
        </li>
      </ul>
    </div>
  </header>
</template>
