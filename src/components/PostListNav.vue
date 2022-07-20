<template>
  <nav class="my-3 text-sm xs:text-base sm:float-right">
    <ul class="flex">
      <li>
        <a
          :href="`/posts/created-desc/page/${pageIndex}`"
          :aria-current="current === 'created-desc'"
          :class="[
            'flex items-center',
            'b-bghover b-2 py-1 px-3',
            'rd-l-1',
            current === 'created-desc' && 'btn-invert' || 'btn-normal',
          ]"
        >
          最新创建
        </a>
      </li>
      <li>
        <a
          :href="`/posts/updated-desc/page/${pageIndex}`"
          :aria-current="current === 'updated-desc'"
          :class="[
            'flex items-center',
            'b-bghover b-2 py-1 px-3',
            'mx--1',
            current === 'updated-desc' && 'btn-invert' || 'btn-normal',
          ]"
        >
          最近修改
        </a>
      </li>
      <li>
        <a
          :href="`/posts/visitor-desc/page/${pageIndex}`"
          :aria-current="current === 'visitor-desc'"
          :class="[
            'flex items-center',
            'b-bghover b-2 py-1 px-3',
            'rd-r-1',
            current === 'visitor-desc' && 'btn-invert' || 'btn-normal',
          ]"
        >
          最多访问
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  current: 'created-desc' | 'updated-desc' | 'visitor-desc';
  pageIndex: number;
}>();
</script>
