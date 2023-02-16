<template>
  <div class="hidden" />
</template>

<script client:idle lang="ts">
import { trackPageview } from '~/misc/plausible';

// eslint-disable-next-line import/prefer-default-export
export function onLoad() {
  trackPageview();
}
</script>
