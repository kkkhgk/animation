<template>
  <canvas id="stars" style="background-color: black;"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
let context = ref<CanvasRenderingContext2D | null>()
let arr: any[] = []
let starCount = 800
let rains: any[] = []
let rainCount = 40
let windowWidth = window.innerWidth
let playStarsId: number = -1
let playRainsId: number = -1

function init() {
  const stars = document.getElementById('stars') as HTMLCanvasElement
  stars.width = windowWidth
  stars.height = window.innerHeight
  context.value = stars.getContext('2d')
}

class Star {
  x: number
  y: number
  text: string
  color: string

  constructor() {
    this.x = windowWidth * Math.random()
    this.y = 5000 * Math.random()
    this.text = '.'
    this.color = 'white'
  }

  getColor() {
    let _r = Math.random()

    if (_r < 0.5) {
      this.color = '#333'
    } else {
      this.color = 'white'
    }
  }

  init() {
    this.getColor()
  }

  draw() {
    if (context.value) {
      context.value.fillStyle = this.color
      context.value.fillText(this.text, this.x, this.y)
    }
  }
}

class MeteorRain {
  x: number
  y: number
  length: number
  angle: number
  width: number
  height: number
  speed: number
  offset_x: number
  offset_y: number
  alpha: number
  color1: string
  color2: string

  constructor() {
    this.x = -1
    this.y = -1
    this.length = -1
    this.angle = 30
    this.width = -1
    this.height = -1
    this.speed = 1
    this.offset_x = -1
    this.offset_y = -1
    this.alpha = 1
    this.color1 = ''
    this.color2 = ''
  }

  init() {
    this.getPos()
    this.alpha = 1
    this.getRandomColor()
    let x = Math.random() * 80 + 150
    this.length = Math.ceil(x)
    this.angle = 30
    x = Math.random() + 0.5
    this.speed = Math.ceil(x)
    let cos = Math.cos((this.angle * 3.14) / 180)
    let sin = Math.sin((this.angle * 3.14) / 180)
    this.width = this.length * cos
    this.height = this.length * sin
    this.offset_x = this.speed * cos
    this.offset_y = this.speed * sin
  }

  getRandomColor() {
    let a = Math.ceil(255 - 240 * Math.random())
    this.color1 = 'rgba(' + a + ',' + a + ',' + a + ',1)'
    this.color2 = 'black'
  }

  countPos() {
    this.x = this.x - this.offset_x
    this.y = this.y + this.offset_y
  }

  getPos() {
    this.x = Math.random() * window.innerWidth
    this.y = Math.random() * window.innerHeight
  }

  draw() {
    if (context.value) {
      context.value.save()
      context.value.beginPath()
      context.value.lineWidth = 1
      context.value.globalAlpha = this.alpha
      let line = context.value.createLinearGradient(
        this.x,
        this.y,
        this.x + this.width,
        this.y - this.height
      )

      line.addColorStop(0, 'white')
      line.addColorStop(0.3, this.color1)
      line.addColorStop(0.6, this.color2)
      context.value.strokeStyle = line
      context.value.moveTo(this.x, this.y)
      context.value.lineTo(this.x + this.width, this.y - this.height)
      context.value.closePath()
      context.value.stroke()
      context.value.restore()
    }
  }

  move() {
    if (context.value) {
      let x = this.x + this.width - this.offset_x
      let y = this.y - this.height
      context.value.clearRect(x - 3, y - 3, this.offset_x + 5, this.offset_y + 5)
      this.countPos()
      this.alpha -= 0.002
      this.draw()
    }
  }
}

const playStars = () => {
  for (let n = 0; n < starCount; n++) {
    arr[n].getColor()
    arr[n].draw()
  }

  playStarsId = requestAnimationFrame(playStars)
}

const playRains = () => {
  for (let n = 0; n < rainCount; n++) {
    let rain = rains[n]
    rain.move()
    if (rain.y > window.innerHeight) {
      if (context.value) {
        context.value.clearRect(rain.x, rain.y - rain.height, rain.width, rain.height)
      }
      rains[n] = new MeteorRain()
      rains[n].init()
    }
  }
  playRainsId = requestAnimationFrame(playRains)
}

onMounted(() => {
  init()

  for (let i = 0; i < starCount; i++) {
    let star = new Star()
    star.init()
    star.draw()
    arr.push(star)
  }

  for (let i = 0; i < rainCount; i++) {
    let rain = new MeteorRain()
    rain.init()
    rain.draw()
    rains.push(rain)
  }

  playStarsId = requestAnimationFrame(playStars)
  playRainsId = requestAnimationFrame(playRains)
  // playStars()
  // playRains()
})

onUnmounted(() => {
  if (playStarsId !== -1) {
    cancelAnimationFrame(playStarsId)
  }
  if (playRainsId !== -1) {
    cancelAnimationFrame(playRainsId)
  }
  arr = []
  rains = []
})
</script>