<template>
    <div class="dialog-mask flexCC" :class="{'mask-bg': showMask}" @click.self="close">
        <div class="dialog-content">
            <img class="dialog-type" :src="`https://cdn1.didiapp.com/dialog/${status ? status : 'warn'}.png`" alt="">
            <p class="c-11 fontHv font5w tac" v-html="title"></p>
            <p class="desc c-66" v-html="content"></p>
            <div class="flexAR btns">
                <span v-show="type === 'confirm'" class="cancel c-red font14 fontHv font5w" @click="close">
                    {{cancelBtn ? cancelBtn : '取消'}}
                </span>
                <span :style="{ width: type === 'confirm' ? '120px' : '200px' }" class="confirm font14 fontHv font5w" @click="confirmAction">
                    {{confirmBtn ? confirmBtn : '确认'}}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/* @ts-ignore */
import * as TWEEN from 'tween.js';
import { reactive, toRefs, getCurrentInstance } from 'vue'
export default {
    props: {
        showMask: {
            type: Boolean,
            default: true
        },
        status: {
            type: String,
            default: 'warn'
        },
        type: {
            type: String,
            default: 'alert'
        },
        title: {
            type: String,
            default: '提示'
        },
        content: String,
        cancelBtn: {
            type: String,
            default: '取消'
        },
        confirmBtn: {
            type: String,
            default: '确定'
        },
        confirmCb: Function,
        cancelCb: Function,
        autoClose: Boolean
    },
    methods: {
        confirmAction () {
            this.confirmCb && this.confirmCb()
            this.close()
        },
        close () {
            let El = document.querySelector('.dialog-content') as HTMLElement
            let maskEl = document.querySelector('.dialog-mask') as HTMLElement
            new TWEEN.Tween({ scale: 1, opacity: .5 })
            .to({ scale: 0, opacity: 0 }, 100)
            .onUpdate(() => {
                /* @ts-ignore */
                El && (El.style.transform = `scale(${this.scale})`)
                /* @ts-ignore */
                this.showMask && maskEl && (maskEl.style.backgroundColor = `rgba(0, 0, 0, ${this.opacity})`)
            })
            .onComplete(() => {
                this.cancelCb && this.cancelCb()
                let parents = document.getElementsByClassName('lovenote-dialog-c')
                // @ts-ignore
                this.instance && parents[parents.length - 1].removeChild(this.instance.vnode.el)
                document.body.removeChild(parents[parents.length -1])
            })
            .start(new Date().getTime())
            function animate() {
                if (TWEEN.update(new Date().getTime())) {
                    requestAnimationFrame(animate);
                }
            }
            animate()
        }
    },
    setup() {
        const state = reactive({
            instance: {}
        })
        state.instance = getCurrentInstance() || {}
        return { ...toRefs(state) }
    }
}
</script>

<style lang="scss" scoped>
.mask-bg {
    background-color: rgba($color: #000000, $alpha: .5);
}
.dialog-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 99;
    .dialog-content {
        position: relative;
        top: -60px;
        width: calc(100% - 80px);
        padding: 16px 0 20px 0;
        background-color: #fff;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 6px 10px -2px rgba($color: #000000, $alpha: .1);
        animation: showIn .3s;
        .dialog-type {
            height: 82px;
            margin-bottom: 20px;
        }
        .desc {
            margin-top: 18px;
            padding: 0 30px;
            font-size: 14px !important;
            :deep(span), :deep(p) {
                font-size: 14px !important;
            }
        }
        .btns {
            padding: 0 12px;
            margin-top: 30px;
        }
        .cancel, .confirm {
            width: 120px;
            height: 40px;
            line-height: 40px;
            margin: 0 4px;
            border-radius: 20px;
            text-align: center;
            border: 1px solid #FD536E;
        }
        .confirm {
            color: #fff;
            background: linear-gradient(to right, #FD536E, #FF70B5);
        }
    }
}

@keyframes showIn {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
</style>