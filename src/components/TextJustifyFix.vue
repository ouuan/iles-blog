<template>
  <div />
</template>

<script client:idle lang="ts">
export async function onLoad() {
  await document.fonts.ready;
  const math = Array.from(document.getElementsByClassName('math-inline'));
  math.forEach((node) => {
    if (!node.parentElement) return;
    if (getComputedStyle(node.parentElement).textAlign !== 'justify') {
      return;
    }
    if (node.getBoundingClientRect().width
      < node.parentElement.getBoundingClientRect().width / 3) {
      return;
    }
    node.parentElement.style.textAlign = 'initial';
  });
}
</script>
