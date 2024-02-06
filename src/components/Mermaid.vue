<!-- eslint-disable vue/no-v-html -->

<template>
  <div
    class="flex justify-center dark:hidden"
    v-html="lightSvg"
  />
  <div
    class="justify-center dark:important-flex"
    style="display:none;"
    v-html="darkSvg"
  />
</template>

<script setup lang="ts">
defineProps<{
  lightSvg: string;
  darkSvg: string;
}>();
</script>
