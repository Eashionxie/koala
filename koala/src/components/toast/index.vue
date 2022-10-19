<template>
    <div class="toast-mask flexCC" :class="[mask ? 'show' : 'hide']">
        <div class="toast-content flexCC" :class="[type]">
            <div v-if="loading" class="toast-loading">
                <div class="spinner flexCC">
                    <div class="loader-inner ball-pulse-sync">
                        <div v-for="item in 3" :key="item" :style="{'background-color': '#dfdfdf'}"></div>
                    </div>
                </div>
            </div>
            <div class="toast-text">
                {{txt}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {reactive, getCurrentInstance, toRefs } from 'vue'
export default {
    props: {
        mask: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: 'dark'
        },
        loading: {
            type: Boolean,
            default: false
        },
        txt: {
            type: String,
            default: ''
        },
        time: {
            type: Number,
            default: 3000
        },
        completed: {
            type: Function
        }
    },
    mounted() {
        if (this.time > 0) {
            setTimeout(() => {
                this.destroyToast()
            }, this.time)
        }
    },
    setup() {
        const state = reactive({
            instance: {}
        })
        state.instance = getCurrentInstance()
        return { ...toRefs(state) }
    },
    methods: {
        destroyToast () {
            this.competed && this.completed()
            let toastEl = document.getElementById('lovenote-toast')
            toastEl.removeChild(this.instance.vnode.el)
            document.body.removeChild(toastEl)
        }
    },
}
</script>

<style lang="scss" scoped>
$amount: 6px;

.toast-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2033;
    animation: maskIn .3s;
    .toast-content {
        position: relative;
        flex-direction: column;
        max-width: 66%;
        padding: 8px;
        border-radius: 6px;
        top: -60px;
        font-size: 14px !important;
        .toast-text {
            font-size: 14px;
        }
    }
    .light {
        color: #111111;
        background-color: #fff;
    }
    .dark {
        color: #ffffff;
        background-color: rgba($color: #000000, $alpha: .75);
    }
}

.show {
    background-color: rgba($color: #000000, $alpha: .5);
}

.hide {
    pointer-events: none;
    background-color: rgba($color: #000000, $alpha: 0);
}


@function delay($interval, $count, $index) {
  @return ($index * $interval) - ($interval * $count);
}

@mixin ball-pulse-sync($n: 3, $start: 1) {
    @for $i from $start through $n {
        > div:nth-child(#{$i}) {
        animation: ball-pulse-sync 0.6s delay(0.07s, $n, $i) infinite ease-in-out;
        }
    }
}

.toast-loading {
    position: relative;
    // position: absolute;
    // left: 0;
    // top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 2033;
}
.spinner {
    // position: absolute;
    // top: 50%;
    // left: 50%;
    flex-direction: column;
    width: 80px;
    height: 60px;
    // transform: translate(-50%, -50%);
}

.ball-pulse-sync {
    @include ball-pulse-sync();
    > div {
        width: 10px;
        height: 10px;
        border-radius: 100%;
        margin: 2px;
        animation-fill-mode: both;
        display: inline-block;
    }
}

@keyframes ball-pulse-sync {
    33% {
        transform: translateY($amount);
    }
    66% {
        transform: translateY(-$amount);
    }
    100% {
        transform: translateY(0);
    }
}

@keyframes maskIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}
</style>