<!-- eslint-disable vue/no-v-html -->

<template>
  <section
    class="code-block relative my-6 shadow"
    v-bind="isCodeAnd({
      itemprop: 'hasPart',
      itemscope: true,
      itemtype: 'https://schema.org/SoftwareSourceCode',
    })"
  >
    <div
      class="h-6 items-center rd-t-1 bg-area px-4 dark:bg-#2A313A media-screen:important-flex"
      style="display:none;"
    >
      <deep-heading
        class="text-3 text-footer"
        :itemprop="isCodeAnd('programmingLanguage')"
        :level="headingLevel"
        :aria-label="`${lang} 代码块`"
      >
        {{ lang }}
      </deep-heading>
      <copy-button client:visible />
    </div>
    <div
      class="dark:hidden"
      :itemprop="isCodeAnd('text')"
      v-html="lightHtml"
    />
    <div
      class="dark:important-block"
      style="display:none;"
      v-html="darkHtml"
    />
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  lang: string;
  darkHtml: string;
  lightHtml: string;
  headingLevel?: number;
}>(), {
  headingLevel: 6,
});

function isCodeAnd<T>(x: T) {
  if (props.lang === 'plain text') return undefined;
  return x;
}
</script>

<style scoped lang="scss">
.code-block:hover :deep(.copy-button) {
  @apply opacity-100;
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
