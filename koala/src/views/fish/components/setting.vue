<script setup lang="ts">
import { defineEmits, ref, onMounted } from 'vue'
// @ts-ignore
import * as TWEEN from 'tween.js';

const emit = defineEmits(['closeSetting', 'saveSettings'])
const props = defineProps({
    start1: {
        type: Number
    },
    start2: {
        type: Number
    },
    end1: {},
    end2: {},
})

const start1Time = ref()
const start2Time = ref()
const end1Time = ref()
const end2Time = ref()
const start1Arr: any = ref([])
const start2Arr: any = ref([])
const end1Arr: any = ref([])
const end2Arr: any = ref([])
const curPikeIndex = ref(0)
const showTimePicker = ref(false)
const pickValMap = [start1Time, end2Time, end1Time, start2Time]
const pickArrMap = [start1Arr, end2Arr, end1Arr, start2Arr]
const pickHandler = (i: number) => {
    curPikeIndex.value = i
    showTimePicker.value = true
}
const pickConfirm = () => {
    pickArrMap[curPikeIndex.value].value = pickValMap[curPikeIndex.value].value.split(':')
    showTimePicker.value = false
}

const close = () => {
    const maskEl = document.querySelector('.mask-setting') as HTMLElement
    new TWEEN.Tween({ opacity: .5 })
    .to({ opacity: 0 }, 20)
    .onUpdate(function () {
        // @ts-ignore
        maskEl.style.background = `rgba(0, 0, 0, ${this.opacity})`
    })
    .onComplete(() => {
        emit('closeSetting')
    })
    .start()
    function animate() {
        if (TWEEN.update()) {
            requestAnimationFrame(animate);
        }
    }
    animate()
}

const saveConfig = () => {
    emit('saveSettings', { start1Arr: start1Arr.value, start2Arr: start2Arr.value, end1Arr: end1Arr.value, end2Arr: end2Arr.value })
}

onMounted(() => {
    const st1 = new Date(Number(props.start1))
    const st2 = new Date(Number(props.start2))
    const end1 = new Date(Number(props.end1))
    const end2 = new Date(Number(props.end2))
    const st1_h = st1.getHours() > 9 ? st1.getHours() : `0${st1.getHours()}`
    const st1_m = st1.getMinutes() > 9 ? st1.getMinutes() : `0${st1.getMinutes()}`
    const st2_h = st2.getHours() > 9 ? st2.getHours() : `0${st2.getHours()}`
    const st2_m = st2.getMinutes() > 9 ? st2.getMinutes() : `0${st2.getMinutes()}`
    const end1_h = end1.getHours() > 9 ? end1.getHours() : `0${end1.getHours()}`
    const end1_m = end1.getMinutes() > 9 ? end1.getMinutes() : `0${end1.getMinutes()}`
    const end2_h = end2.getHours() > 9 ? end2.getHours() : `0${end2.getHours()}`
    const end2_m = end2.getMinutes() > 9 ? end2.getMinutes() : `0${end2.getMinutes()}`
    start1Arr.value = [st1_h, st1_m]
    start2Arr.value = [st2_h, st2_m]
    end1Arr.value = [end1_h, end1_m]
    end2Arr.value = [end2_h, end2_m]
    start1Time.value = start1Arr.value.join(':')
    start2Time.value = start2Arr.value.join(':')
    end1Time.value = end1Arr.value.join(':')
    end2Time.value = end2Arr.value.join(':')
})
</script>

<template>
    <div class="mask-setting" @click.self="close">
        <div class="content">
            <div class="close flexTC" @click="close">
                <span class="iconfont icon-W-03"></span>
            </div>
            <div class="forms">
                <div class="time-1">
                    <p class="label font14">上班时间</p>
                    <div class="value flexTC" @click="pickHandler(0)">
                        <span v-for="i in start1Arr" :key="i">{{i}}</span>
                    </div>
                </div>
                <div class="time-2">
                    <p class="label font14">下班时间</p>
                    <div class="value flexTC" @click="pickHandler(1)">
                        <span v-for="i in end2Arr" :key="i">{{i}}</span>
                    </div>
                </div>
                <div class="time-2">
                    <p class="label font14">午休开始时间</p>
                    <div class="value flexTC" @click="pickHandler(2)">
                        <span v-for="i in end1Arr" :key="i">{{i}}</span>
                    </div>
                </div>
                <div class="time-2">
                    <p class="label font14">午休结束时间</p>
                    <div class="value flexTC" @click="pickHandler(3)">
                        <span v-for="i in start2Arr" :key="i">{{i}}</span>
                    </div>
                </div>
                <button @click="saveConfig">保存</button>
            </div>
        </div>
        <div v-if="showTimePicker" class="time-picker" @click.self.stop="showTimePicker = false">
            <van-datetime-picker
                v-model="pickValMap[curPikeIndex].value"
                type="time"
                title="选择上班时间"
                :min-hour="0"
                :max-hour="24"
                @confirm="pickConfirm"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/styles/themes";
$clientW: calc(var(--vw_px) * 100);
.mask-setting {
    position: fixed;
    left: 0;
    top: 0;
    width: $clientW;
    height: 100%;
    background-color: #00000080;
    animation: bgIn .6s;
    z-index: 99;
    .content {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 68%;
        @include bg_color();
        box-shadow: 2px 0 20px 0px #00000080;
        .close {
            height: 44px;
            padding: 0 12px;
            border-bottom: 1px solid #ccc;
        }
        .forms {
            padding: 15px;
            .time-1, .time-2 {
                .value {
                    width: 120px;
                    height: 32px;
                    margin-top: 8px;
                    margin-bottom: 18px;
                    border: 1px solid;
                    border-radius: 4px;
                    @include border_color();
                    span {
                        position: relative;
                        flex: 1;
                        text-align: center;
                        &:first-of-type::after {
                            content: ":";
                            position: absolute;
                            right: -1px;
                            top: 50%;
                            transform: translateY(-56%);
                        }
                    }
                }
            }
            button {
                width: 78px;
                height: 32px;
                margin-top: 20px;
                border-radius: 6px;
                border: none;
            }
        }
    }
    .time-picker {
        position: absolute;
        left: 0;
        bottom: 0;
        width: $clientW;
        height: 100%;
        background-color: #00000080;
        animation: bgIn2 .3s;
        .van-picker {
            position: absolute;
            bottom: 0;
            left: 0;
            width: $clientW;
            animation: contentIn .3s;
        }
    }
}

@keyframes bgIn {
    0% {
        background-color: #00000000;
    }
    50% {
        background-color: #00000000;
    }
    100% {
        background-color: #00000080;
    }
}

@keyframes bgIn2 {
    0% {
        background-color: #00000000;
    }
    100% {
        background-color: #00000080;
    }
}

@keyframes contentIn {
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0%)
    }
}
</style>