<script lang="ts" setup>
import Hammer from 'hammerjs'
// @ts-ignore
import * as TWEEN from 'tween.js';
import { ref, computed, onMounted, watch } from 'vue';
import tool from '@/utils';

const props = defineProps({
    cycle: {
        type: Number,
        default: () => 27
    },
    duration: {
        type: Number,
        default: () => 7
    },
    absolute_duration: {
        type: Number,
        default: () => 7
    },
    last_period_at: {
        type: String
    },
    absolute_last: {
        type: String
    },
    lastRecord: {
        type: Object,
        default: () => { {} }
    }
})

const emits = defineEmits(['updateData'])

const DAY_TIME = 24 * 60 * 60 * 1000
const TODAYStamp = new Date(new Date().toLocaleDateString()).getTime()
const baseAngle = 14
const between2 = 10
const color1 = '#FF8787'
const color2 = '#87D9E8'
const color3 = '#C0A2F2'

const ovulateBegin = ref(new Date())
const end = ref(new Date())
const begin = ref(new Date())
const nextBegin = ref(new Date())
const nextEnd = ref(new Date())
const ovulateEnd = ref(new Date())
const ovulateDay = ref(new Date())
const firstOVU = ref(0)
const curChoose = ref(0)
const initCur = ref(false)
const changeCur = ref(false)
const dateIndex = ref(0)
const stageAngle = ref(0)
const computeDate = ref()
const pointerRotateTween = ref(0)
const PointerMoveTween = ref()

const beginStamp = computed(() => {
    return new Date(new Date(String(props.last_period_at)).toLocaleDateString()).getTime()
})

const between1 = computed(() => {
    if (!ovulateBegin || !end.value) return -1
    let _bet = ovulateBegin.value.getTime() - end.value.getTime()
    if (_bet < 0) return Math.round((_bet-23*3600000) / DAY_TIME)
    return Math.round(_bet / DAY_TIME)
})

const pointAngle = computed(() => {
    if (between1.value < 0) {
        return (360 - (props.duration + between2 + between1.value) * baseAngle) / (props.cycle - (props.duration + between1.value + between2))
    }
    return (360 - (props.duration + between2) * baseAngle) / (props.cycle - (props.duration + between2))
})

const ovuMax = computed(() => {
    if (between1.value < 0) return ((props.duration - 1) + between1.value + between2) * baseAngle
    return (props.duration + 9) * baseAngle + (between1.value) * pointAngle.value
})

const lunation = computed(() => {
    if (!end.value || !begin.value) return 0
    return Math.round((end.value.getTime() - begin.value.getTime()) / DAY_TIME + 1)
})

const isLate = computed(() => {
    if (props.lastRecord.status === 0) return
    let dateTime = TODAYStamp
    let lastBeginTime = new Date(new Date(String(props.absolute_last)).toLocaleDateString()).getTime()
    if (dateTime > lastBeginTime + props.cycle * DAY_TIME) return ((dateTime - (lastBeginTime + props.cycle * DAY_TIME)) / DAY_TIME)
    return false
})

const showNext = computed(() => {
    let _dura = props.absolute_duration > props.duration ? props.absolute_duration : props.duration
    if ((TODAYStamp - beginStamp.value)/DAY_TIME <= _dura) return false
    if (new Date().getTime() > new Date(end.value).getTime()+1*24*3600000) return true
    return false
})

const dayName = computed(() => {
    let beginTimestamp = beginStamp.value
    let endTimestamp = new Date(end.value.toLocaleDateString()).getTime()
    let time = beginStamp.value + curChoose.value * (DAY_TIME)
    if (time >= beginTimestamp && time <= endTimestamp) {
        computeDate.value = Math.round((time - beginTimestamp) / DAY_TIME) + 1
        // daySign = require('@/assets/yima/yima2.png')
        return '姨妈期'
    }
    if (time <= ovulateDay.value.getTime() && time >= ovulateDay.value.getTime() - 23 * 60 * 60 * 1000) {
        computeDate.value = Math.round((time - ovulateBegin.value.getTime()) / DAY_TIME) + 1
        // this.daySign = require('@/assets/yima/flower2.png')
        return '排卵日'
    }
    if (time >= ovulateBegin.value.getTime() && time <= ovulateEnd.value.getTime()) {
        computeDate.value = Math.round((time - ovulateBegin.value.getTime()) / DAY_TIME) + 1
        // this.daySign = require('@/assets/yima/flower2.png')
        return '排卵期'
    }
    else {
        endTimestamp = begin.value.getTime() + DAY_TIME* props.lastRecord.duration_days - 23*3600000
        if ((time - new Date(props.lastRecord.last_period_at).getTime())/DAY_TIME > props.cycle + 30) {
            endTimestamp = begin.value.getTime() + DAY_TIME*props.duration - 23*3600000
        }
        // this.daySign = require('@/assets/yima/safe.png')
        if (time > endTimestamp && time < ovulateBegin.value.getTime()) {
            computeDate.value = Math.round((time - (endTimestamp + 1000)) / DAY_TIME)
        } else {
            computeDate.value = Math.round((time - new Date(ovulateEnd.value.toLocaleDateString()).getTime() - 1000) / DAY_TIME)
        }
        return '安全期'
    }
})

const itemRotate = (val: number) => {
    let l = lunation.value
    let b1 = between1.value
    if (val < props.duration) return val * baseAngle // 经期
    if (val >= l && (val - l) < (b1-1)) {
        return (pointAngle.value * (val - props.duration)) + (props.duration * baseAngle)
    }
    if (b1 >= 0) { // 排卵期
        if (val >= (l + (b1 - 1)) && val <= (l + b1 + between2)) {
            return (props.duration) * baseAngle + pointAngle.value * (b1) + (val - l - (between1.value-1)) * baseAngle
        }
        if (val > (l + b1 + between2)) {
            return (pointAngle.value * (val - (10 + props.duration))) + ((props.duration + 10)*baseAngle)
        }
    }
    if (b1 < 0) {
        if (val >= (l + (b1 - 1)) && val < (l + b1 + between2)) {
            return (props.duration + b1) * baseAngle + (val - l - between1.value) * baseAngle
        }
        if (val >= (l + b1 + between2)) {
            return (pointAngle.value * (val - (10 + props.duration + b1) + 1)) + ((props.duration + 10 + b1 - 1)*baseAngle)
        }
    }
    return -1
}

const pointerRotate = computed({
    get () {
        if (!itemRotate) return 90
        if (!changeCur.value) {
            let beginTimestamp = new Date(begin.value.toLocaleDateString()).getTime()
            let dateTime = TODAYStamp
            for(let i = 0; i < props.cycle; i++) {
                let time = new Date(beginTimestamp + i*DAY_TIME).getTime()
                if (dateTime - time === 0) dateIndex.value = i
            }
        }
        return itemRotate(dateIndex.value) + 90
    },
    set (val) {
        !changeCur.value && (changeCur.value = true)
        dateIndex.value = val
    }
})

watch(() => pointerRotate.value,
    (newVal, oldVal) => {
        const circle3 = document.querySelector('#circle-3') as HTMLElement
        let curPointer = circle3?.style?.transform?.split('rotate(')?.[1]?.split('deg)')?.[0] || oldVal
        if (newVal < Number(curPointer) - 180) curPointer = (Number(curPointer) - 90) - 270
        if ((newVal > 270) && (Number(curPointer) < 180)) newVal = (newVal - 360)
        if (PointerMoveTween) {
            PointerMoveTween.value?.stop()
            PointerMoveTween.value = null
        }
        PointerMoveTween.value = new TWEEN.Tween({ val: curPointer })
        .to({ val: newVal }, 100)
        .onUpdate(function() {
            // @ts-ignore
            pointerRotateTween.value = this.val
        })
        .start()
        function animate() {
            if (TWEEN.update()) {
                requestAnimationFrame(animate);
            }
        }
        animate()
    }
)

const inOVU = (index: number) => {
    if (between1.value < 0) {
        if (index >= (props.duration + between1.value) * baseAngle + between1.value * pointAngle.value - 2 && index < ovuMax.value) return true
    }
    if (index >= (props.duration) * baseAngle + (between1.value) * pointAngle.value && index < ovuMax.value) return true
}

const inYima = (i: number) => {
    if ((props.lastRecord.status !== 0 && (((TODAYStamp - beginStamp.value)/DAY_TIME) >= props.cycle)) || isLate.value) return
    let date_item = new Date(String(props.absolute_last)).getTime() + i*DAY_TIME
    if (props.lastRecord.status === 0) {
        if (date_item <= new Date().getTime()) return true
    } else {
        if (TODAYStamp > new Date(props.lastRecord.last_period_at).getTime() + props.lastRecord.duration_days * DAY_TIME &&
        props.lastRecord.duration_days > props.absolute_duration) return false
        let endTime = new Date(String(props.absolute_last)).getTime() + (DAY_TIME * props.lastRecord.duration_days)
        if (TODAYStamp >= (endTime + 0*24*3600000) && ((TODAYStamp - beginStamp.value)/DAY_TIME > props.absolute_duration)) return false
        if (date_item >= begin.value.getTime() && date_item < endTime && date_item < new Date().getTime()) return true
        else return false
    }
}

const inSafe = (i: number) => {
    if (i >= lunation.value && (i - lunation.value) <= between1.value) {
        return 90 - ((pointAngle.value * (i - props.duration)) + (props.duration*baseAngle))
    }
    else {
        if (between1.value >= 0) {
            return 90 - ((pointAngle.value * (i - (10 + props.duration))) + ((props.duration + 10)*baseAngle))
        } else {
            return 90 - ((pointAngle.value * (i - (10 + props.duration + between1.value) + 1)) + ((props.duration + 10 + between1.value - 1)*baseAngle))
        }
    }
    
}

const ovuDates = (i: number) => {
    if (between1.value >= 0 &&
        i >= (props.duration + between1.value - 1) &&
        i <= (props.duration + between1.value + between2 - 2)) {
            if (i === (props.duration + between1.value - 1)) firstOVU.value = i
            return true
        }
    if (between1.value < 0 && i >= (props.duration + between1.value - 1) && i <= (props.duration + between1.value + between2 - 1)) return true
}

const isOvuDay = (i: number) => {
    if (!ovulateDay.value) return
    let beginTimestamp = new Date(begin.value.toLocaleDateString()).getTime()
    let time = beginTimestamp + i*DAY_TIME
    if (time <= ovulateDay.value.getTime() && time >= ovulateDay.value.getTime() - 23 * 60 * 60 * 1000) return true
}

const isToday = (i: number) => {
    let _date1 = new Date()
    let _date2 = new Date(begin.value.getTime() + i*DAY_TIME)
    if (_date1.getFullYear() === _date2.getFullYear() && _date1.getMonth() === _date2.getMonth() && _date1.getDate() === _date2.getDate()) {
        if (!initCur.value) {
            curChoose.value = i
            initCur.value = true
        }
        return true
    }
    return false
}


const weekMap = (i: number, cycle: number, duration: number) => {
    let map = ['日', '一', '二', '三', '四', '五', '六']
    let day = 1
    if (i < duration && (new Date().getTime() - begin.value.getTime()) > (duration+1) * DAY_TIME) {
        day = new Date(begin.value.getTime() + i*DAY_TIME + cycle * DAY_TIME).getDay()
    } else {
        day = new Date(begin.value.getTime() + i*DAY_TIME).getDay()
    }
    return map[day]
}

const dateFilter = (i: number, cycle: number, duration: number) => {
    if (i < duration && (new Date().getTime() - begin.value.getTime()) > (duration+1) * DAY_TIME) {
        return new Date(begin.value.getTime() + i*DAY_TIME + cycle * DAY_TIME).getDate()
    } else {
        return new Date(begin.value.getTime() + i*DAY_TIME).getDate()
    }
}

const monthFilter = (i: number, cycle?: number, duration?: number) => {
    if (!cycle || !duration) return new Date(begin.value.getTime() + i*DAY_TIME).getMonth() + 1
    if (i < duration && (new Date().getTime() - begin.value.getTime()) > (duration+1) * DAY_TIME) {
        return new Date(begin.value.getTime() + i*DAY_TIME + cycle * DAY_TIME).getMonth() + 1
    } else {
        return new Date(begin.value.getTime() + i*DAY_TIME).getMonth() + 1
    }
}

const choose = (i: number) => {
    curChoose.value = i
    pointerRotate.value = i
    navigator.vibrate && navigator.vibrate(50);
}

const init = () => {
    let _begin = beginStamp.value
    let _today = TODAYStamp
    let _btws = (_today - _begin) / DAY_TIME
    let cycleTimes = Math.floor((_today - _begin) / (props.cycle*DAY_TIME))
    if ((_btws >= props.cycle) && props.lastRecord.status !== 0) {
        begin.value = new Date(_begin + cycleTimes * (props.cycle*DAY_TIME))
        emits('updateData', 'last_period_at', tool.getAnyDate(begin.value))
    } else {
        begin.value = new Date(_begin)
    }
    let beginTime = new Date(begin.value.toLocaleDateString()).getTime()
    let durationTime
    let endTime
    let cycleTime
    if (!props.lastRecord?.status) {
        durationTime = props.duration * DAY_TIME
        endTime = durationTime - DAY_TIME
        cycleTime = props.cycle * DAY_TIME
        end.value = new Date(beginTime + endTime)
    } else {
        if (props.lastRecord.status === 0) {
            durationTime = props.duration * DAY_TIME
            if (_today >= _begin + props.duration * DAY_TIME) {
                durationTime = TODAYStamp - beginStamp.value + DAY_TIME
            }
        } else {
            if (_btws < props.cycle &&
                ((TODAYStamp - beginStamp.value)/DAY_TIME <= props.duration ||
                _today <= _begin + props.lastRecord.duration_days * DAY_TIME )) {
                durationTime = props.lastRecord.duration_days * DAY_TIME
            } else {
                durationTime = props.duration * DAY_TIME
            }
        }
        if ((props.lastRecord.status === 0 && (durationTime / DAY_TIME > props.duration)) ||
            (props.lastRecord.status !== 0 && _btws < props.cycle && _today <= (_begin + props.lastRecord.duration_days) * DAY_TIME)) {
            emits('updateData', 'duration', durationTime / DAY_TIME)
        }
        endTime = durationTime - DAY_TIME
        cycleTime = props.cycle * DAY_TIME
        if ((props.lastRecord.status === 0 && (durationTime / DAY_TIME > props.duration) )||
            (props.lastRecord.status !== 0 && _btws < props.cycle && _today <= (_begin + props.lastRecord.duration_days) * DAY_TIME)) {
            end.value = new Date(_begin + endTime)
        } else {
            end.value = new Date(beginTime + endTime)
        }
    }
    nextBegin.value = new Date(beginTime + endTime + cycleTime)
    nextEnd.value = new Date(beginTime + endTime + cycleTime + durationTime)
    ovulateBegin.value = new Date(beginTime + cycleTime - 19 * DAY_TIME)
    ovulateEnd.value = new Date(beginTime + cycleTime - 9 * DAY_TIME - 1000)
    ovulateDay.value = new Date(beginTime + cycleTime - 14 * DAY_TIME)
}

const initHammer = () => {
    const stage = document.getElementsByClassName('circle-1')[0]
    if (!stage) {
        setTimeout(() => {
            initHammer()
        }, 50)
        return
    }
    const circle = document.getElementsByClassName('circle-1')[0] as HTMLElement
    let center = { x: circle.clientWidth / 2 + circle.offsetLeft, y: circle.clientHeight / 2 + circle.getBoundingClientRect().top }
    const mc = new Hammer.Manager(stage)
    const Pan = new Hammer.Pan()
    mc.add(Pan)
    mc.on('pan', (e) => {
        let tan = (center.y - e.center.y) / (e.center.x - center.x)
        let angle = Math.atan(tan) / (Math.PI / 180)
        if (center.y - e.center.y < 0 && e.center.x - center.x > 0) {
            angle = 360 + angle
        } else if (center.y - e.center.y < 0 && e.center.x - center.x < 0) {
            angle = 180 + angle
        } else if (center.y - e.center.y > 0 && e.center.x - center.x < 0) {
            angle = 180 + angle
        }
        if (!stageAngle.value) stageAngle.value = Math.round(angle)
        if (Math.round(angle) - stageAngle.value > (baseAngle / 2)) {
            stageAngle.value = Math.round(angle)
            if (curChoose.value > 0) curChoose.value --
            else curChoose.value = props.cycle - 1
            navigator.vibrate && navigator.vibrate(50);
        } else if (Math.round(angle) - stageAngle.value < - baseAngle / 2) {
            stageAngle.value = Math.round(angle)
            if (curChoose.value < props.cycle - 1) curChoose.value ++
            else {
                curChoose.value = 0
            }
            navigator.vibrate && navigator.vibrate(50);
        }
        pointerRotate.value = curChoose.value
    });
}

onMounted(async () => {
    await init()
    initHammer()
})

</script>

<template>
    <div class="circle-1">
        <div class="circle-2"></div>
        <div class="items">
            <div
                v-for="(item, index) in 360"
                :key="index"
                :class="[
                    `item-${index + 1}`,
                    index <= (duration - 1) * baseAngle ? 'bgc-red2' : '',
                    inOVU(index) ? 'bgc-2' : ''
                ]"
                :style="{'transform': `rotate(${index * 1}deg)`}">
            </div>
            <div
                v-for="(date, i) in cycle"
                :key="`a-${i}`"
                class="flexCC"
                :class="[
                    i < duration ? 'detail' : 'poin-box',
                    i === curChoose ? i < duration ? 'itemYima' : ovuDates(curChoose) ? 'itemOVU' : 'itemSafe' : '',
                    isToday(i) ? 'z-10' : i < duration ? 'z-9' : 'z-8'
                ]"
                :style="{
                    'transform': `rotate(${itemRotate(i)}deg)`
                }"
                @click="choose(i)"
            >
                <p
                    v-if="i < duration"
                    ref="red"
                    class="date c-white"
                    :class="[inYima(i) ? 'number' : '']"
                    :style="{'transform': `rotate(${(i * -(baseAngle)) + 90}deg) scale(1)`}"
                >
                    <span
                        v-if="i === 0"
                        style="transform: translateY(5px) scale(.8)"
                    >
                        <span v-if="showNext" class="font12 fontHv font5w">
                            {{monthFilter(i, cycle, duration > absolute_duration ? duration : absolute_duration)}}月
                        </span>
                        <span v-else>
                            <span v-if="!isToday(i)" class="font12">
                                周{{weekMap(i, cycle, duration > absolute_duration ? duration : absolute_duration)}}
                            </span>
                        </span>
                    </span>
                    <span v-else style="transform: translateY(6px) scale(.6)">
                        <span v-if="!isToday(i)" class="font12">
                            周{{weekMap(i, cycle, duration > absolute_duration ? duration : absolute_duration)}}
                        </span>
                    </span>
                    <span v-if="!isToday(i)" class="fontHv font5w" style="transform:translateY(-2px)">
                        {{dateFilter(i, cycle, duration > absolute_duration ? duration : absolute_duration)}}
                    </span>
                    <span v-if="isToday(i)">今</span>
                </p>
                <p v-else-if="ovuDates(i)" class="date c-white" :i="i" :class="[ isOvuDay(i) ? 'flower' : '', inYima(i) ? 'number' : '']" :style="{'transform': `rotate(${90 - itemRotate(i)}deg)`}">
                    <span v-if="!isToday(i)" style="transform: translateY(6px) scale(.6)">
                        <span v-if="i === firstOVU" class="font14 fontHv font5w">
                            {{monthFilter(i)}}月
                        </span>
                        <span v-else class="font12">
                            周{{weekMap(i, cycle, duration > absolute_duration ? duration : absolute_duration)}}
                        </span>
                    </span>
                    <span v-if="!isToday(i)" style="transform:translateY(-2px)">
                        {{dateFilter(i, cycle, duration > absolute_duration ? duration : absolute_duration)}}
                    </span>
                    <span v-if="isToday(i)">今</span>
                </p>
                <p v-else :class="{'active-point': isToday(i), 'number': inYima(i)}" :style="{'transform': `rotate(${inSafe(i)}deg)`,
                                    'background': color2}">
                    <span v-if="isToday(i)" class="c-white">今</span>
                </p>
            </div>
        </div>
        <div
            id="circle-3"
            class="circle-3 flexCC"
            :class="[dayName === '姨妈期' ? 'color1' : dayName === '安全期' ? 'color2' : 'color3']"
            :style="{'transform': `translate(-50%, -50%) rotate(${pointerRotateTween}deg)`,
            'background': dayName === '姨妈期' ? color1 : dayName === '安全期' ? color2 : color3}">
            <div class="circle-info" :style="{ 'transform': `rotate(${-(pointerRotateTween - 90)}deg)` }">
                <p class="font12 c-white" style="margin-bottom: 2px">
                    {{monthFilter(curChoose, cycle, duration > absolute_duration ? duration : absolute_duration)}}月
                    {{dateFilter(curChoose, cycle, duration > absolute_duration ? duration : absolute_duration)}}日
                        星期{{weekMap(curChoose, cycle, duration > absolute_duration ? duration : absolute_duration)}}
                </p>
                <p class="day-name" :style="{'color': dayName === '姨妈期' ? color1 : dayName === '安全期' ? color2 : color3}">
                    <span class="font12 fontHv font5w">{{dayName}}</span>
                </p>
                <p class="c-white">
                    <span class="font14">第</span>
                    <span class="font52">{{computeDate}}</span>
                    <span class="font14">天</span>
                </p>
                <p class="c-white font14">{{dayName === '姨妈期' ? '不宜爱爱' : dayName === '安全期' ? '怀孕几率30%' : '怀孕几率70%'}}</p>
                <p v-if="isLate" class="font14" style="color:rgba(255, 227, 127, 1)">{{`姨妈推迟${isLate}天`}}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/styles/themes";

$clientW: calc(var(--vw_px) * 100);


.circle-1, .circle-2 {
    transition: all .3s;
}
.bgc-red2 {
    background-color: #FF8787 !important;
    z-index: -1 !important;
}
.bgc-2 {
    background-color: #C0A2F2;
}
.z-10 {
    z-index: 10 !important;
}

.z-9 {
    z-index: 9 !important;
}

.z-8 {
    z-index: 8 !important;
}

.itemYima {
    background: #FF7474;
    box-shadow: 0 0 12px 2px #f55555;
}

.itemOVU {
    background: #C0A2F2;
    box-shadow: 0 0 12px 2px #a97ef0;
}

.itemSafe {
    background: #87D9E8;
    box-shadow: 0 0 6px 1px #6cd5e7;
}

.circle-1 {
    position: relative;
    top: 80px;
    left: 27px;
    width: calc($clientW - 56px);
    height: calc($clientW - 56px);
    border-radius: 50%;
    background-color: #ffffff;
    transform: rotate(-90deg);
    box-shadow: 0 2px 12px 0 rgba($color: #B10000, $alpha: .1);
    .circle-2 {
        position: absolute;
        left: 50%;
        top: 50%;
        width: calc($clientW - 134px);
        height: calc($clientW - 134px);
        border-radius: 50%;
        @include bg_color();
        transform: translate(-50%, -50%);
        box-shadow: inset 0 2px 12px 0 rgba($color: #B10000, $alpha: .1);
    }
    .circle-3 {
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc($clientW - 174px);
        height: calc($clientW - 174px);
        border-radius: 50%;
        z-index: 2;
        .circle-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            .day-name {
                width: 86px;
                height: 24px;
                line-height: 22px;
                border-radius: 12px;
                text-align: center;
                background-color: #fff;
                img {
                    width: 10px;
                    margin-right: 5px;
                }
            }
            span {
                vertical-align: baseline;
            }
        }
    }
    .color1::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 1px;
        width: 0;
        height: 0;
        border: 8px transparent solid;
        border-right: 10px solid transparent;
        border-bottom: 12px solid #FF8787;
        border-left: 10px solid transparent;
        transform: translate(-50%, -100%);
    }
    .color2::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 1px;
        width: 0;
        height: 0;
        border: 8px transparent solid;
        border-right: 10px solid transparent;
        border-bottom: 12px solid #87D9E8;
        border-left: 10px solid transparent;
        transform: translate(-50%, -100%);
    }
    .color3::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 1px;
        width: 0;
        height: 0;
        border: 8px transparent solid;
        border-right: 10px solid transparent;
        border-bottom: 12px solid #C0A2F2;
        border-left: 10px solid transparent;
        transform: translate(-50%, -100%);
    }
    .items {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 40px;
        height: 40px;
        transform: translate(-50%, -50%);
        div {
            position: absolute;
            left: calc(($clientW - 136px) / 2 + 20px);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            z-index: -2;
            transform-origin: calc(var(--pc) * -120px) 20px;
        }
    }
    .flower {
        background: url('../../../assets/yima/flower.png') no-repeat;
        background-size: 40px 40px;
    }
    .date {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all .3s;
    }
    .number {
        position: relative;
        background: url(../../../assets/yima/yima3.png) no-repeat;
        background-size: auto 88%;
        background-position: center;
    }
    .active-point {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        background-color: #fff;
    }
}
</style>
