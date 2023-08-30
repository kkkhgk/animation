/**
 * 文字跳舞
 */
<script setup lang="ts">
import { ref,onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const canvasWidth = 480;
const canvasHeight = 750;
let ctxRef: CanvasRenderingContext2D | null = null;
let frameId: number = 0;
let filltext:string='2'

const { t } = useI18n();
const boxRef = ref<HTMLDivElement>();
const videoRef = ref<HTMLVideoElement>();
const canvasRef = ref<HTMLCanvasElement>();

const init = () => {
  if (boxRef.value && videoRef.value && canvasRef.value) {
    canvasRef.value.width = canvasWidth;
    canvasRef.value.height = canvasHeight;
    ctxRef = canvasRef.value.getContext("2d", {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;// 获取canvas的2D渲染上下文
    videoRef.value.crossOrigin = "anonymous";//设置视频的跨域属性为"anonymous"
  }
};

const play = () => {
  if (videoRef.value && ctxRef) {
    ctxRef.drawImage(
      videoRef.value,
      0,
      0,
      canvasWidth,
      canvasHeight
    );
    const imageData = ctxRef.getImageData(
      0,
      0,
      canvasWidth,
      canvasHeight
    );// 获取画布上的图像数据
    ctxRef.clearRect(0, 0, canvasWidth, canvasHeight); // 清空画布
    const { data, width, height } = imageData;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const startIndex = (y * width + x) * 4;
        if (x % 6 === 0 && y % 6 === 0) {
          const avgColor =
            (data[startIndex] + data[startIndex + 1] + data[startIndex + 2]) /
            3;
          ctxRef.fillStyle = `rgb(${avgColor}, ${avgColor}, ${avgColor})`;// 设置字体颜色为平均颜色
          ctxRef.font = "10px Arial"; // 设置字体样式
          ctxRef.fillText(filltext, x, y);// 给像素点绘制数字
        }
      }
    }
    frameId = window.requestAnimationFrame(play);
  }
};


onMounted(() =>{
  init();
  play();
})

onUnmounted(() => {
  frameId && cancelAnimationFrame(frameId);
})
</script>

<template>
  <div class="container" ref="boxRef">
    <video :muted="false" autoPlay preload="true" loop x5-video-player-fullscreen="true" x5-playsinline="true" playsInline
      webkit-playsinline="true" crossOrigin="anonymous" ref="videoRef">
      <source src="/dance.mp4" />
    </video>
    <canvas ref="canvasRef">
      {{ t("common.browserTooLow") }}
    </canvas>
    <div>
      <span style="color:black">请选择要填充的数字：</span>
      <select id="filltext" v-model="filltext">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
    </div>
  </div>
  
  
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  video {
    position: absolute;
    width: 324px;
    height: 570px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    visibility: hidden;
  }

}

</style>