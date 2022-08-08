<template>
  <div
    v-on-click-outside="() => showMenu = false"
    class="relative flex items-stretch"
  >
    <button
      title="切换暗色模式"
      class="p-2 bghover flex items-center"
      @click="showMenu = !showMenu"
    >
      <span class="text-xl i-mdi-theme-light-dark" />
    </button>
    <div
      v-show="showMenu"
      class="absolute z-20 top-full right-0 bg-popup shadow-md rd-1 whitespace-nowrap"
    >
      <ul>
        <li
          v-for="key of ['auto', 'light', 'dark'] as const"
          :key="key"
          class="bghover"
        >
          <button
            :class="['flex items-center p-1', theme === key && 'text-hover']"
            @click="theme = key"
          >
            <span :class="[icon[key], 'mr-1']" />
            <span>{{ name[key] }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import useTheme from '~/composables/useTheme';

const theme = useTheme();

const name = {
  auto: '跟随系统',
  dark: '总是暗色',
  light: '总是亮色',
} as const;

const icon = {
  auto: 'i-mdi-cellphone md:i-mdi-tablet lg:i-mdi-monitor',
  light: 'i-mdi-white-balance-sunny',
  dark: 'i-mdi-weather-night',
} as const;

const showMenu = ref(false);
</script>
