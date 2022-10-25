<script setup lang="ts">
import { ref } from 'vue'
import tool from '@/utils'
import clock from './components/clock.vue'
import setting from './components/setting.vue'

const unitMap = ['时', '分', '秒']
const timeArr: any = ref([])
const status = ref(0)
const start1 = ref(new Date().setHours(9, 30, 0, 0))
const start2 = ref(new Date().setHours(14, 0, 0, 0))
const end1 = ref(new Date().setHours(12, 0, 0, 0))
const end2 = ref(new Date().setHours(18, 30, 0, 0))
let timer: any

const calcTime = () => {
    const curTime = new Date().getTime()
    const timeNodes = [start1.value, start2.value, end1.value, end2.value].sort((a, b) => a - b)
    let curTimeNode: number = -1
    try {
        timeNodes.forEach((cur: number, i: number) => {
            if (curTime - cur <= 0) throw(i)
        })
    } catch (e: any) {
        curTimeNode = e
    }
    let timeObj = timeNodes[curTimeNode] ? tool.timeLast(timeNodes[curTimeNode] / 1000, curTime / 1000) : {}
    switch (curTimeNode) {
        // 下班
        case -1:
            timer && clearInterval(timer)
            status.value = -1
            break
        // 还没上班
        case 0:
            timer && clearInterval(timer)
            status.value = 0
            break
        // 上午
        case 1:
            status.value = 1
            timeArr.value = [timeObj.hours, timeObj.minutes, timeObj.seconds]
            break
        // 午休
        case 2:
            status.value = 2
            timeObj = tool.timeLast(timeNodes[3] / 1000, curTime / 1000)
            timeArr.value = [timeObj.hours, timeObj.minutes, timeObj.seconds]
            break
        // 下午
        case 3:
            status.value = 3
            timeArr.value = [timeObj.hours, timeObj.minutes, timeObj.seconds]
            break
        default:
            break;
    }
}

const showSetting = ref(false)
const toSetting = () => {
    showSetting.value = true
}

const saveSettings = ({ start1Arr, start2Arr, end1Arr, end2Arr }: any) => {
    console.log(start1Arr)
    start1.value = new Date().setHours(start1Arr[0], start1Arr[1], 0, 0)
    start2.value = new Date().setHours(start2Arr[0], start2Arr[1], 0, 0)
    end1.value = new Date().setHours(end1Arr[0], end1Arr[1], 0, 0)
    end2.value = new Date().setHours(end2Arr[0], end2Arr[1], 0, 0)
}

calcTime()
timer = setInterval(calcTime, 1000)

</script>

<template>
    <div class="page">
        <div v-if="timeArr.length" class="timer">
            <span>还有</span>
            <span
                class="time-i"
                v-for="(item, index) in timeArr"
                :key="index">
                {{item}}
                {{unitMap[index]}}
            </span>
            <span>就{{status === 1 ? '午休了' : '下班了'}}</span>
        </div>
        <div v-if="status === -1" class="timer">
            今天这个班就上到这了
        </div>
        <div v-if="status === 0" class="timer">
            马上就要开始摸鱼了
        </div>
        <clock />
        <div style="text-align: center;">
            <button @click="toSetting">设置</button>
        </div>
        <Transition name="popR">
            <setting
                v-if="showSetting"
                :start1="start1"
                :start2="start2"
                :end1="end1"
                :end2="end2"
                @saveSettings="saveSettings"
                @closeSetting="showSetting = false" />
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
.page {
    .timer {
        line-height: 22px;
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        .time-i {
            position: relative;
            display: inline-block;
            width: 48px;
        }
    }
}

.popR-enter-active, .popR-leave-active {
    transition: all .3s;
}

.popR-enter-from, .popR-leave-active {
    transform: translateX(100%);
}
</style>