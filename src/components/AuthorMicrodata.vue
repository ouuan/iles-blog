<template>
  <div
    class="hidden"
    itemscope
    itemtype="https://schema.org/Person"
  >
    <meta
      itemprop="name"
      :content="site.author"
    >
    <meta
      itemprop="givenName"
      :content="site.firstName"
    >
    <meta
      itemprop="familyName"
      :content="site.lastName"
    >
    <meta
      itemprop="url"
      :content="site.authorLink"
    >
    <link
      v-if="GENDER[site.gender]"
      itemprop="gender"
      :href="`https://schema.org/${GENDER[site.gender]}`"
    >
    <meta
      v-else
      itemprop="gender"
      :content="site.gender"
    >
    <meta
      itemprop="image"
      content="/android-chrome-512x512.png"
    >
  </div>
</template>

<script setup lang="ts">
const { site } = usePage();

const GENDER = {
  male: 'Male',
  female: 'Female',
} as Record<string, string | undefined>;
</script>
