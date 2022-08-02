<page>
title: 文章列表
</page>

<template layout="base">
  <div class="m-4 standard-card">
    <post-list-nav
      current="created-desc"
      :page-index="1"
    />
    <post-list
      :page-index="1"
      href-prefix="/posts/created-desc/page"
      title="文章列表: 最新创建"
    />
  </div>
</template>
