<page>
title: 搜索
</page>

<template layout="base">
  <fuse-search
    client:load
    :data="data"
    :meta="meta"
  />
</template>

<script setup lang="ts">
const docs = useDocuments<unknown>('~/pages/{post/**/*,about}.{md,mdx}');

const data = await Promise.all(docs.value.map(async (doc) => {
  const title = doc.frontmatter.title as string;
  const tags = ((doc.frontmatter.tags || []) as string[]).join(' ');
  let content = '';
  if (import.meta.env.SSR) {
    const { readFile } = await import('fs/promises');
    const buffer = await readFile(doc.meta.filename);
    content = buffer.toString().replace(/.*?---.*?---\s*/s, '').replace(/<Excerpt ?\/>/, '');
  }
  return { title, tags, content };
}));

const meta = docs.value.map((doc) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { description, ...frontmatter } = doc.frontmatter;
  const { href, filename } = doc.meta;
  return { frontmatter, href, filename };
});
</script>
