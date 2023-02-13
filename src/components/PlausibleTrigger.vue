<template>
  <div class="hidden" />
</template>

<script client:load lang="ts">
import { trackPageview } from '~/misc/plausible';

// eslint-disable-next-line import/prefer-default-export
export function onLoad() {
  trackPageview();
}
</script>
