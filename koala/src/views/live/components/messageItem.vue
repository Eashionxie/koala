<script setup lang="ts">
// @ts-ignore
import lottie from 'lottie-web';
import { ref, onMounted } from 'vue'

const showAnimaExp = ref(true)
const animation = ref()

const props = defineProps({
    item: {
        type: Object
    }
})

const initAnimaExp = () => {
    let el = document.querySelector('.anima-exp') as HTMLElement
    if (!el) return
    animation.value = lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: 2,
        autoplay: false,
        path: props.item?.content?.url
    })
    animation.value.setSpeed(.7)
    animation.value.addEventListener('DOMLoaded', () => { setTimeout(() => {
        animation.value.play()
    }, 100) })
    animation.value.addEventListener('complete', () => {
        animation.value && animation.value.destroy()
        animation.value = ''
        showAnimaExp.value = false
    })
}

onMounted(() => {
    if (props.item?.content?.url?.indexOf('.json') > -1 && props.item?.messageType === 'LN:SigExpMsg') {
        initAnimaExp()
    }
})
</script>

<template>
    <div class="message-item-content c-white">
        <div v-if="props.item && props.item.messageType === 'LN:SigExpMsg'" class="user-msg">
            <span v-if="props.item.content.ext" class="user-nickname">{{props.item.content.ext.user_info.nickname.trim() || '系统消息'}}：</span>
            <img  v-if="props.item.content.url.indexOf('.gif') > -1" class="emoji" :src="props.item.content.url" alt="">
            <div  v-if="props.item.content.url.indexOf('.json') > -1 && showAnimaExp" ref="animaExp" class="anima-exp"></div>
            <img v-if="props.item.content.url.indexOf('.json') > -1 && !showAnimaExp" class="emoji" :src="props.item.content.ext.result" alt="">
        </div>
        <div v-else class="user-msg text-msg">
            <span v-if="props.item && props.item.content.ext" class="user-nickname">{{props.item.content.ext.user_info.nickname.trim() || '系统消息'}}：</span>
            <span v-if="props.item" style="word-break: break-all;overflow-wrap:anywhere">{{props.item.content.content}}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.name {
    margin: 0 2px;
    font-weight: 500;
}
.message-item-content {
    display: inline-block;
    padding: 10px 0;
    border-radius: 5px;
    span {
        font-size: 12px;
    }
    .text-msg {
        display: block !important;
        span {
            vertical-align: baseline;
        }
    }
    .user-msg {
        position: relative;
        line-height: 16px;
        .tag-list {
            display: inline-block;
            img {
                position: relative;
                width: 32px;
                height: 14px;
                top: 0;
                margin-right: 4px;
            }
        }
        .user-nickname {
            word-break: keep-all;
        }
        .emoji {
            width: 40px;
            height: 40px;
        }
        .anima-exp {
            display: inline-block;
            width: 40px;
            height: 40px;
        }
    }
}
</style>