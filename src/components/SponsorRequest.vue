<template>
  <div class="my-6 flex justify-center">
    <button
      v-if="clickToOpen && !opened"
      class="btn btn-normal px-2 gap-1"
      @click="opened = true"
    >
      <span class="i-mdi-gift" />
      <span>赞赏支持</span>
    </button>
    <div
      v-else
      class="flex justify-center gap-6 relative"
    >
      <button
        v-if="clickToOpen"
        class="absolute w-full h-full z-1"
        title="点击关闭赞赏信息"
        @click="opened = false"
      />
      <figure class="flex-1 flex flex-col gap-3 items-center">
        <Picture
          alt="微信赞赏码"
          src="@/images/wechat-donate.png?preset=post"
        />
        <figcaption>微信打赏</figcaption>
      </figure>
      <figure class="flex-1 flex flex-col gap-3 items-center">
        <Picture
          alt="支付宝收款码"
          src="@/images/alipay-donate.png?preset=post"
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
