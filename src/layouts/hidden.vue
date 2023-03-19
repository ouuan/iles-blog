<template layout="base">
  <Head>
    <meta
      name="robots"
      content="noindex,nofollow"
    >
    <meta
      name="referrer"
      content="no-referrer"
    >
  </Head>
  <div class="flex flex-row-reverse justify-center">
    <table-of-contents
      client:load
      :headings="page.meta.headings"
    />
    <div class="m-4 max-w-200 grow standard-card">
      <article>
        <post-head
          client:load
          class="my-12"
          :href="page.meta.href"
          :filename="page.meta.filename"
          :frontmatter="page.frontmatter"
        />
        <section class="article-style">
          <slot />
        </section>
      </article>
      <giscus-comments />
    </div>
  </div>
</template>

<script setup lang="ts">
const page = usePage();
</script>
