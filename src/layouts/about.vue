<template layout="base">
  <div class="m-4 standard-card xl:px-24 2xl:px-30 3xl:px-36">
    <article
      itemprop="mainEntity"
      itemscope
      itemtype="https://schema.org/Article"
    >
      <post-microdata :post="page" />
      <post-head
        client:load
        :href="page.meta.href"
        :filename="page.meta.filename"
        :frontmatter="page.frontmatter"
      />
      <section
        class="article-style"
        itemprop="articleBody"
      >
        <slot />
      </section>
    </article>
    <giscus-comments />
  </div>
</template>

<script setup lang="ts">
import site from '~/site';

const page = usePage();

useHead({
  meta: [
    { property: 'og:type', content: 'profile' },
    { property: 'profile:first_name', content: site.firstName },
    { property: 'profile:last_name', content: site.lastName },
    { property: 'profile:username', content: site.author },
    { property: 'profile:gender', content: site.gender },
  ],
  style: [{
    type: 'text/css',
    children: `
.muse { color: #E50080 !important; }
.aqours { color: #19B1F6 !important; }
.nijigasaki { color: #F8B656 !important; }
.liella { color: #DA57D8 !important; }
.kanon { color: #FF7F27 !important; }
.kuku { color: #A0FFF9 !important; }
.mia { color: #A9A898 !important; }
.emma { color: #84C36E !important; }
.honoka { color: #FFAE00 !important; }
`,
  }],
});
</script>
