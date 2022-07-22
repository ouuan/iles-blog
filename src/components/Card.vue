<!-- eslint-disable vue/no-v-html -->

<template>
  <component
    :is="fold ? 'details' : 'div'"
    :class="['shadow-md rd-1 b-l-6 my-6', boxClasses[type]]"
  >
    <component
      :is="fold ? 'summary' : 'div'"
      :class="['p-3 flex items-center gap-1', fold && 'cursor-pointer']"
    >
      <span :class="['text-5', icon[type]]" />
      <span
        class="truncate font-bold"
        v-html="title || defaultTitle[type]"
      />
      <span
        v-if="fold"
        class="grow flex justify-end"
      >
        <span class="details-icon text-5" />
      </span>
    </component>
    <div class="bg-card dark:bg-bghover overflow-auto px-6 rd-br-1">
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'note' | 'warn' | 'alert' | 'hint';
  fold?: boolean;
  title?: string;
}>(), {
  type: 'note',
  fold: false,
  title: '',
});

const boxClasses = {
  note: 'bg-blue-1 dark:bg-blue-9 b-blue',
  warn: 'bg-orange-1 dark:bg-orange-9 b-orange',
  alert: 'bg-red-1 dark:bg-red-9 b-red-5',
  hint: 'bg-green-2 dark:bg-green-9 b-green-5',
};

const defaultTitle = {
  note: 'Note',
  warn: 'Warning',
  alert: 'Alert',
  hint: 'Hint',
};

const icon = {
  note: 'i-mdi-pencil text-blue',
  warn: 'i-mdi-alert-outline text-orange',
  alert: 'i-mdi-alert-circle-outline text-red',
  hint: 'i-mdi-lightbulb-outline text-green',
};
</script>

<style lang="scss" scoped>
details > summary .details-icon {
  @apply i-mdi-chevron-down;
}
details[open] > summary .details-icon {
  @apply i-mdi-chevron-up;
}

.shadow-md .shadow-md {
  @apply shadow-lg;
}
</style>
