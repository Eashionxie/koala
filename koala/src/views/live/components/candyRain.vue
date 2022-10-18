<script lang="ts" setup>
import lottie from 'lottie-web'
import Candy from './candy'
import bgLine from './bgLine'
import { ref, onMounted } from 'vue'

const throttle = (fn: any, delay: any) => {
    let timer: any
    return function() {
        let args = arguments
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                // @ts-ignore
                fn.apply(this, args)
            }, delay)
        }
    }
}

const prop = defineProps({
    rainInfo: {
        type: Object
    }
})

const emit = defineEmits(['finishRain'])

const timeStampFilter = (val: any, endTime: any) => {
    if (!val) return ' '
    if (endTime < val) return 0
    return Math.round((endTime - val) / 1000)
}

const readyRain = ref()

const initReady = () => {
    if (prop.rainInfo) {
        readyRain.value = lottie.loadAnimation({
            container: document.querySelector('.anima-ready') as HTMLElement,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: `https://cdn1.didiapp.com/wedding/ready_rain${prop.rainInfo.type === 7 ? '' : '_redbag'}.json`
        })
        readyRain.value.addEventListener('DOMLoaded', () => { readyRain.value.play() })
        readyRain.value.addEventListener('complete', () => {
            initRain()
        })
        const candyEl = document.querySelector('#candyRain') as HTMLElement
        candyEl.addEventListener('click', throttle(clickHandler, 100))
    }
}

const candyList: any = ref([])
const getList: any = ref([])
const clickHandler = (e: any) => {
    let el = candyList.value.find((v: any) => v.id == e.target.id)
    if (el) {
        if (getList.value.indexOf(el.id) === -1) {
            getList.value.push(el.id)
            el.userDestroy()
        }
    }
}

const finalClick = ref(false)
const startTime = ref()
const timeStamp = ref()
const endTime = ref()
const lines: any = ref([])
const timer2 = ref()
const i = ref(0)
const timer = ref()

const initRain = () => {
    finalClick.value = false
    startTime.value = timeStamp.value = new Date().getTime()
    endTime.value = startTime.value + (prop.rainInfo?.duration - 3) * 1000
    lines.value = []
    timer2.value = setInterval(() => {
        lines.value.push(new bgLine(document.querySelector('.candy-rain-bg') as HTMLElement))
    }, 200)

    candyList.value.push(new Candy(i.value, document.querySelector('#candyRain') as HTMLElement, finish, prop.rainInfo?.type))
    timer.value = setInterval(() => {
        i.value++
        let time = new Date().getTime()
        if (i.value % 5 === 0) timeStamp.value = time
        if (time <= endTime.value) {
            if (time > (endTime.value - 3000) && !finalClick.value) {
                finalClick.value = true
            }
            candyList.value.push(new Candy(i.value, document.querySelector('#candyRain') as HTMLElement, finish, prop.rainInfo?.type))
        } else {
            clearInterval(timer.value)
            timer.value = null
            i.value = 0
        }
    }, 300)
}

const finish = () => {
    clearInterval(timer2.value)
    timer2.value = null
    emit('finishRain')
    // this.$parent.showRedBagLoading = true
    // setTimeout(() => {
    //     this.$parent.showRedBagLoading = false
    //     gainRedBag({ red_packet_id: prop.rainInfo.red_packet_info.id, room_id: this.room_id }).then(res => {
    //         this.$parent.dialogData = {
    //             showDialog: true,
    //             title: res.data.shell_amount ? `恭喜你获得了<span style="color: #F5A413">${res.data.shell_amount}贝壳</span>` : `十分不巧，您与${prop.rainInfo.type === 7 ? '糖果' : '红包'}擦身而过`,
    //             dialogType: 'alert',
    //             dialogStatus: res.data.shell_amount ? 'shell' : 'plz',
    //             confirmBtn: '确认',
    //             delayClose: 5000
    //         }
    //         this.$parent.showCandyRain = false
    //     })
    // }, 2000);
}

onMounted(() => {
    initReady()
})
</script>

<template>
    <div ref="rainBox" class="candy-rain-bg">
        <div v-show="candyList && candyList.length" class="guide flexBT">
            <div class="timer">
                <span class="label">倒计时：</span>
                <span class="fontHv font5w font20" style="color: #FFDEAF">{{timeStampFilter(timeStamp, endTime)}}s</span>
            </div>
            <div class="number">
                <img v-if="rainInfo" :src="`https://cdn1.didiapp.com/wedding/${rainInfo.type === 7 ? 'candy/candy-icon' : 'redbag'}.png`" alt="">
                <span class="fontHv font5w font20" style="color: #FFDEAF">x{{getList.length}}</span>
            </div>
        </div>
        <div id="candyRain" class="full"></div>
        <div ref="anima" class="anima-ready"></div>
    </div>
</template>

<style lang="scss">
.candy-rain-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: .5);
    z-index: 10;
    .guide {
        height: 32px;
        align-items: center;
        padding: 18px 16px;
        .timer {
            .label {
                color: rgba($color: #ffffff, $alpha: .7) !important;
            }
        }
        .number {
            img {
                width: 32px;
                height: 32px;
                margin-right: 6px;
            }
            span {
                display: inline-block;
                width: 26px;
                text-align: right;
            }
        }
    }
    .anima-ready {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
    }
    .line {
        position: absolute;
        width: 2px;
        height: 100px;
    }
    .star {
        position: absolute;
        width: 26px;
        height: 26px;
        background-size: 26px 26px;
        background-repeat: no-repeat;
    }
}
.candy {
    position: absolute;
    display: block;
    width: 100px;
    z-index: 999;
}
.candy-destroy {
    animation: candyDestroy 1s;
}

.candy-destroy2 {
    opacity: 0;
}

@keyframes candyDestroy {
    0% { padding: 0; opacity: 1; }
    100% { padding: 80px; opacity: 0; }
}
</style>