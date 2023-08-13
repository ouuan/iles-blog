<template>
  <div class="my-6 flex justify-center">
    <button
      v-if="clickToOpen && !opened"
      class="btn gap-1 px-2 btn-normal"
      @click="opened = true"
    >
      <span class="i-mdi-gift" />
      <span>打赏作者</span>
    </button>
    <div
      v-else
      class="relative flex justify-center gap-6"
    >
      <figure class="flex flex-1 flex-col items-center gap-3">
        <Picture
          alt="微信赞赏码"
          src="@/images/wechat-donate.png?preset=normal"
        />
        <figcaption>微信打赏</figcaption>
      </figure>
      <figure class="flex flex-1 flex-col items-center gap-3">
        <Picture
          alt="支付宝收款码"
          src="@/images/alipay-donate.png?preset=normal"
        />
        <figcaption>支付宝打赏</figcaption>
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

withDefaults(defineProps<{
  clickToOpen?: boolean;
}>(), {
  clickToOpen: false,
});

const opened = ref(false);
</script>

<style lang="scss" scoped>
:deep(picture), :deep(img) {
  @apply w-full;
}
</style>
