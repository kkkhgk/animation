<template>
  <div style="width: 100%">
    <div class="container">
      <video muted autoPlay preload="true" loop x5-video-player-fullscreen="true" x5-playsinline="true" playsInline
        webkit-playsinline="true">
        <source src="/vista.mp4" />
      </video>
      <p>River</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 600px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;

  video {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  p {
    position: absolute;
    width: 100%;
    height: 600px;
    line-height: 600px;
    left: 0;
    top: 0;
    background-color: #fff;
    font-size: 22vw;
    font-weight: 600;
    text-align: center;
    color: #000;
    mix-blend-mode: screen;
  }
}
</style>