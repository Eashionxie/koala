<script setup lang="ts">
import { onMounted, ref } from 'vue';

const htmlEl = document.querySelector('html') as HTMLElement
const theme = ref('')
theme.value = htmlEl?.getAttribute('data-theme') || 'theme'
const ratio = window.devicePixelRatio
const ctx: any = ref()
const ctxWidth = ref()
const ctxHeight = ref()
const themeMap: any = {
    'theme': '#ffffff',
    'theme_re': '#333333',
    'theme1': '#333333',
    'theme1_re': '#ffffff',
}
const radius = 88

const atChange = (mutationList: any) => {
    mutationList.map((mutation: any) => {
        if (mutation.type == 'attributes' && mutation.attributeName === 'data-theme') {
            theme.value = mutation.target.getAttribute('data-theme')
            updateCtx('strokeStyle', themeMap[`${theme.value}_re`])
        }
    })
}
const observerConfig = { attributes: true }
let observer = new MutationObserver(atChange)

observer.observe(document.querySelector('html') as HTMLElement, observerConfig)

const initClock = () => {
    const canvasEl = document.querySelector('#clock') as HTMLCanvasElement
    if (!canvasEl) return

    // 放大再缩小
    canvasEl.width = canvasEl.clientWidth * ratio
    canvasEl.height = canvasEl.clientHeight * ratio
    canvasEl.style.width = String(canvasEl.width / ratio)
    canvasEl.style.height = String(canvasEl.height / ratio)

    ctxWidth.value = canvasEl.width / ratio
    ctxHeight.value = canvasEl.height / ratio

    ctx.value = canvasEl.getContext("2d")
    if (!ctx.value) return
    ctx.value.scale(ratio, ratio)
}

const updateCtx = (name: string, value: any) => {
    ctx.value[name] = value
    ctx.value.stroke()
}

const drawCircle = () => {
    ctx.value.save()
    ctx.value.beginPath()
    ctx.value.arc(0.5 * ctxWidth.value, 0.5 * ctxHeight.value, radius, 0 , 2 * Math.PI)
    ctx.value.lineWidth = 4
    ctx.value.strokeStyle = themeMap[`${theme.value}_re`]
    ctx.value.stroke()
    drawPoints()
}

const drawPoints = () => {
    ctx.value.save()
    const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    ctx.value.font = 16 + 'px Arial'
    ctx.value.textAlign = 'center'  //将数字的位置摆正
    ctx.value.textBaseline = 'middle'
    //画出1-12的数字
    hours.forEach((v, i) => {
        const rad = 2 * Math.PI / 12 * i
        const x = (0.5 * ctxWidth.value + Math.sin(rad) * (radius - 16))
        const y = (0.5 * ctxHeight.value - Math.cos(rad) * (radius - 16))
        ctx.value.fillStyle = '#000'
        ctx.value.fillText(v, x, y)
    });
    //画出秒针走动的60个点
    for (var i = 0; i < 60; i++) {
        const rad = 2 * Math.PI / 60 * i
        const x = (0.5 * ctxWidth.value + Math.sin(rad) * (radius - 2))
        const y = (0.5 * ctxHeight.value + Math.cos(rad) * (radius - 2))
        ctx.value.beginPath()
        if (i % 5 === 0) {   //整点的圆圈是黑色的，非整点的部分是灰色的
            ctx.value.fillStyle = '#000'
            ctx.value.arc(x, y, 3, 0, 2, 2 * Math.PI, false)
        } else {
            ctx.value.fillStyle = '#999'
            ctx.value.arc(x, y, 2, 0, 2, 2 * Math.PI, false)
        }
        ctx.value.fill()
        
    }
}

const drawHourHand = (hour: number, minute: number) => {
    ctx.value.save()
    ctx.value.beginPath()
    const rotate_h = 2 * Math.PI / 12 * hour
    const rotate_m = 2 * Math.PI / 12 / 60 * minute

    ctx.value.moveTo(
        0.5 * ctxWidth.value - Math.sin(rotate_h + rotate_m) * 6,
        0.5 * ctxWidth.value + Math.cos(rotate_h + rotate_m) * 6
    )
    ctx.value.lineTo(
        (0.5 * ctxWidth.value + Math.sin(rotate_h + rotate_m) * (radius - 60)),
        (0.5 * ctxHeight.value - Math.cos(rotate_h + rotate_m) * (radius - 60))
    )
    ctx.value.lineCap = 'round'
    ctx.value.lineWidth = 6
    ctx.value.strokeStyle = '#000'
    ctx.value.stroke()
}

const drawMinuteHand = (minute: number) => {
    ctx.value.save()
    ctx.value.beginPath()
    const rotate_m = 2 * Math.PI / 60 * minute

    ctx.value.moveTo(
        0.5 * ctxWidth.value - Math.sin(rotate_m) * 10,
        0.5 * ctxWidth.value + Math.cos(rotate_m) * 10
    )
    ctx.value.lineTo(
        (0.5 * ctxWidth.value + Math.sin(rotate_m) * (radius - 45)),
        (0.5 * ctxHeight.value - Math.cos(rotate_m) * (radius - 45))
    )
    ctx.value.lineCap = 'round'
    ctx.value.lineWidth = 4
    ctx.value.strokeStyle = '#666'
    ctx.value.stroke()
}

const drawSecondHand = (second: number) => {
    ctx.value.save()
    ctx.value.beginPath()
    const rotate_s = 2 * Math.PI / 60 * second

    ctx.value.moveTo(
        0.5 * ctxWidth.value - Math.sin(rotate_s) * 16,
        0.5 * ctxWidth.value + Math.cos(rotate_s) * 16
    )
    ctx.value.lineTo(
        (0.5 * ctxWidth.value + Math.sin(rotate_s) * (radius - 30)),
        (0.5 * ctxHeight.value - Math.cos(rotate_s) * (radius - 30))
    )
    ctx.value.lineCap = 'round'
    ctx.value.lineWidth = 2
    ctx.value.strokeStyle = '#FF8787'
    ctx.value.stroke()
}

const drawHandler = () => {
    ctx.value.clearRect(0, 0, ctxWidth.value, ctxHeight.value)
    const timeNow = new Date()
    drawCircle()
    drawHourHand(timeNow.getHours(), timeNow.getMinutes())
    drawMinuteHand(timeNow.getMinutes())
    drawSecondHand(timeNow.getSeconds())
    // ctx.value.restore()
}

onMounted(() => {
    initClock()
    drawHandler()
    setInterval(() => {
        drawHandler()
    }, 1000)
})


</script>

<template>
    <div class="canvas-container">
        <canvas id="clock"></canvas>
    </div>
</template>

<style lang="scss" scoped>
$clientW: calc(var(--vw_px) * 100);

.canvas-container {
    position: relative;
    width: calc($clientW / 1.5);
    height: calc($clientW / 1.5);
    margin-left: calc(($clientW - ($clientW / 1.5)) / 2);
    overflow: hidden;
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>