<template>
  <div
    v-on-click-outside="() => showMenu = false"
    class="relative flex items-stretch"
  >
    <button
      title="暗色模式设置"
      class="flex items-center p-2 bghover"
      aria-haspopup="menu"
      aria-controls="__theme-switcher"
      :aria-expanded="showMenu"
      @mousedown="showMenu = !showMenu"
    >
      <span class="i-mdi-theme-light-dark text-xl" />
    </button>
    <ul
      v-show="showMenu"
      id="__theme-switcher"
      class="absolute right-0 top-full z-20 whitespace-nowrap rd-1 bg-popup shadow-md"
      role="menu"
      aria-label="暗色模式选项"
    >
      <li
        v-for="key of ['auto', 'light', 'dark'] as const"
        :key="key"
        class="bghover"
        role="menuitemradio"
        :aria-checked="key === theme"
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import useTheme from '~/composables/useTheme';

const { store: theme } = useTheme();

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
