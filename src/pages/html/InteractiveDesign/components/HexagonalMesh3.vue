<script setup lang="ts">
import { ref } from 'vue';

const list = new Array(800).fill(0);
const containerRef = ref<HTMLDivElement | null>(null);
</script>

<template>
  <div style="width: 100%; height: 555px; overflow: hidden;">
    <div class="container" ref="containerRef">
      <div v-for="(_, index) in list" :key="index" class="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  $itemWidth: 50px;
  $margin: 1px;
  $perHeight: calc(1.732 * $itemWidth + 4 * $margin - 1px);

  width: 120%;
  height: 120%;
  margin-bottom: calc($itemWidth / -2);
  flex: 0 0 120%;
  transform: translate(-10%, calc($itemWidth / -2));
  position: relative;
  // font-size必须
  font-size: 0;
  cursor: pointer;

  &::before {
    content: "";
    height: 100%;
    width: calc(($itemWidth / 2) + calc($margin / 2));
    shape-outside: repeating-linear-gradient(transparent 0,
        transparent 80px,
        #000 80px,
        #000 $perHeight );
    float: left;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg,
        #f44336,
        #ff9800,
        #ffe607,
        #09d7c4,
        #1cbed3,
        #1d8ae2,
        #bc24d6);
    z-index: 1;
    mix-blend-mode: darken;
    animation: change 8s infinite linear;
    // pointer-events必须
    pointer-events: none;
  }

  .item {
    width: $itemWidth;
    height: calc($itemWidth * 1.1547);
    background: rgba(0, 0, 0, 255);
    transition: 0.6s;
    flex: 0 0 auto;
    clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
    margin: $margin;
    margin-bottom: calc($margin - $itemWidth * 0.2885);
    display: inline-block;
    z-index: 2;

    &:hover {
      transition: 0s;
      background: rgba(255, 255, 255, 255);
    }
  }

  @keyframes change {
    100% {
      filter: hue-rotate(360deg);
    }
  }
}
</style>