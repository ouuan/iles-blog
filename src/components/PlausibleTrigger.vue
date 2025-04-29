<template>
  <div class="hidden" />
</template>

<script client:idle lang="ts">
import { trackPageview } from '~/misc/plausible';

export function onLoad() {
  trackPageview();
}
</script>
