<template>
  ({{ formatDistanceToNow(date, { addSuffix: true, locale: zhCN }) }})
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns';
import zhCN from 'date-fns/locale/zh-CN/index';

defineProps<{
  date: Date;
}>();
</script>
