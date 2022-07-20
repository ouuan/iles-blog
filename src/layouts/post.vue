<template layout="base">
  <div class="flex">
    <div class="grow m-3 standard-card">
      <article>
        <post-head
          client:load
          :href="page.meta.href"
          :filename="page.meta.filename"
          :frontmatter="page.frontmatter"
        />
        <section class="article-style">
          <slot />
        </section>
        <div class="article-style">
          <hr>
        </div>
        <footer>
          <copyright-notice />
        </footer>
      </article>
      <giscus-comments />
      <prev-next-post
        :meta="page.meta"
        :frontmatter="page.frontmatter"
      />
    </div>
    <table-of-contents
      client:load
      :headings="page.meta.headings"
    />
  </div>
</template>

<script setup lang="ts">
const page = usePage();
page.frontmatter.description ||= page.meta.excerpt;
</script>
