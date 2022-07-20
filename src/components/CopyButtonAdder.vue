<template>
  <!-- to make UnoCSS happy :( -->
  <copy-button
    class="hidden"
    to-be-copied=""
  />
</template>

<script client:load lang="ts">
import { createApp } from 'vue';
import CopyButton from '~/components/CopyButton.vue';

// eslint-disable-next-line import/prefer-default-export
export function onLoad() {
  const pres = document.querySelectorAll('pre[class*="language-"]');
  pres.forEach((pre) => {
    const codeNode = pre.parentElement;
    if (codeNode) {
      const code = (pre as HTMLElement).innerText;
      const button = document.createElement('div');
      createApp(CopyButton, {
        toBeCopied: code,
      }).mount(button);
      const clonedCodeNode = codeNode.cloneNode(true);
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      const lang = codeNode.getAttribute('data-lang');
      if (lang) {
        wrapper.setAttribute('data-lang', lang);
      }
      wrapper.appendChild(button);
      wrapper.appendChild(clonedCodeNode);
      codeNode.parentElement?.replaceChild(wrapper, codeNode);
    }
  });
}
</script>
