<template>
  <div style="width: 100%">
    <div class="container">
      <div class="content">
        <div class="cubeInner">
          <div class="top" />
          <div class="bottom" />
          <div class="front" />
          <div class="back" />
          <div class="left" />
          <div class="right" />
        </div>
        <div class="cubeOuter">
          <div class="top" />
          <div class="bottom" />
          <div class="front" />
          <div class="back" />
          <div class="left" />
          <div class="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;

  $cubeRotateX: -35.5deg;

  .content {
    position: relative;

    @mixin cube($width) {
      position: absolute;
      width: $width;
      height: $width;
      left: 50%;
      top: 50%;
      margin: calc($width / -2) 0px 0px calc($width / -2);
      transform-style: preserve-3d;
      transform: rotateX($cubeRotateX) rotateY(45deg);

      div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid white;
      }

      .top {
        transform: rotateX(90deg) translateZ(calc($width / 2));
      }

      .bottom {
        transform: rotateX(-90deg) translateZ(calc($width / 2));
      }

      .front {
        transform: rotateX(0deg) translateZ(calc($width / 2));
      }

      .back {
        transform: rotateX(-180deg) translateZ(calc($width / 2));
      }

      .left {
        transform: rotateY(-90deg) translateZ(calc($width / 2));
      }

      .right {
        transform: rotateY(90deg) translateZ(calc($width / 2));
      }
    }

    .cubeInner {
      $cubewidth: 60px;
      @include cube($cubewidth);
      animation: innerLoop 4s ease-in-out infinite;

      div {
        background-color: #175d96;
      }
    }

    .cubeOuter {
      $cubewidth: 120px;
      @include cube($cubewidth);
      animation: outerLoop 4s ease-in-out infinite;

      div {
        background-color: rgba(141, 214, 249, 0.5);
      }
    }
  }

  @keyframes outerLoop {
    0% {
      transform: rotateX($cubeRotateX) rotateY(45deg);
    }

    50%,
    100% {
      transform: rotateX($cubeRotateX) rotateY(405deg);
    }
  }

  @keyframes innerLoop {
    0% {
      transform: rotateX($cubeRotateX) rotateY(45deg);
    }

    50%,
    100% {
      transform: rotateX($cubeRotateX) rotateY(-315deg);
    }
  }
}
</style>
