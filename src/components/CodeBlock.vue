<!-- eslint-disable vue/no-v-html -->

<template>
  <section
    class="code-block relative my-6 shadow"
    :aria-label="`${lang} 代码块`"
    itemprop="hasPart"
    itemscope
    itemtype="https://schema.org/SoftwareSourceCode"
  >
    <copy-button client:visible />
    <div
      class="flex items-center px-4 h-6 rd-t-1 bg-area dark:bg-#2A313A"
      style="display:none;"
      aria-hidden="true"
    >
      <span
        class="text-3 text-footer"
        itemprop="programmingLanguage"
      >{{ lang }}</span>
    </div>
    <div
      class="light:hidden"
      itemprop="text"
      v-html="darkHtml"
    />
    <div
      class="light:important-block"
      style="display:none;"
      v-html="lightHtml"
    />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  lang: string;
  darkHtml: string;
  lightHtml: string;
}>();
</script>

<style scoped lang="scss">
.code-block:hover :deep(.copy-button) {
  @apply opacity-100;
}

// use inline style to hide it in places without the stylesheet (e.g. RSS feeds)
.flex {
  display: flex !important;
}

:deep() {
  pre.shiki {
    @apply p-4 max-h-80vh print:max-h-fit overflow-auto;

    .dim span {
      @apply opacity-50 ease-out duration-150;
      transition-property: opacity, filter;
      filter: saturate(.5);
    }

    .highlighted::before {
      content: "";
      @apply absolute left-0 h-6 b-l-4 b-blue;
      @apply opacity-0 transition-opacity ease-out;
    }

    &:hover {
      .dim span {
        @apply opacity-100;
        filter: none;
      }

      .highlighted::before {
        @apply opacity-100;
      }
    }
  }
}
</style>
