<script setup lang="ts">
const list = new Array(3).fill(0);
</script>

<template>
  <div style="width: 100%">
    <div class="container">
      <div v-for="(_, index) in list" :key="index" :class="`box${index + 1}`" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 360px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  $shearAngleRadius: 20px;

  @mixin box {
    width: 200px;
    height: 130px;
    background-image: linear-gradient(135deg, #6a0155, #cc4855);

    &:not(:first-child) {
      margin-left: 36px;
    }
  }

  .box1 {
    @include box;
    -webkit-mask: radial-gradient(circle $shearAngleRadius at top left,
        #0000 98%,
        #000) top left,
      radial-gradient(circle $shearAngleRadius at top right, #0000 98%, #000) top right,
      radial-gradient(circle $shearAngleRadius at bottom left, #0000 98%, #000) bottom left,
      radial-gradient(circle $shearAngleRadius at bottom right, #0000 98%, #000) bottom right;
    -webkit-mask-size: 51% 51%;
    -webkit-mask-repeat: no-repeat;
  }

  .box2 {
    @include box;
    --g: #0000 calc(98% - 10px), #000 calc(100% - 10px) 98%, #0000;
    --mask: radial-gradient(farthest-side at 0 0, var(--g)) 0 0/40px 40px no-repeat,
      conic-gradient(from 180deg at right 10px top 10px, #0000 0 90deg, #000 0) 100% 0 / calc(100% - 40px + 10px) calc(100% - 40px + 10px) no-repeat,
      radial-gradient(farthest-side at 100% 100%, var(--g)) 100% 100%/40px 40px no-repeat,
      conic-gradient(from 0deg at left 10px bottom 10px, #0000 0 90deg, #000 0) 0 100% / calc(100% - 40px + 10px) calc(100% - 40px + 10px) no-repeat;
    -webkit-mask: var(--mask);
  }

  .box3 {
    @include box;
    --angle: 130deg;
    --g: #0000 var(--angle), #000 0;
    -webkit-mask: conic-gradient(from calc(var(--angle) / -2 - 45deg) at top $shearAngleRadius left $shearAngleRadius,
        var(--g)) top left,
      conic-gradient(from calc(var(--angle) / -2 + 45deg) at top $shearAngleRadius right $shearAngleRadius,
        var(--g)) top right,
      conic-gradient(from calc(var(--angle) / -2 - 135deg) at bottom $shearAngleRadius left $shearAngleRadius,
        var(--g)) bottom left,
      conic-gradient(from calc(var(--angle) / -2 + 135deg) at bottom $shearAngleRadius right $shearAngleRadius,
        var(--g)) bottom right;
    -webkit-mask-size: 51% 51%;
    -webkit-mask-repeat: no-repeat;
  }
}
</style>