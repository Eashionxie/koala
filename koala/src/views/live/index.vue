<script setup lang="ts">
import { onMounted, ref } from 'vue'
import emojiBoard from './components/emojiBoard.vue'
import giftBoard from './components/giftBoard.vue'
import messageItem from './components/messageItem.vue'
import GiftBanner from './components/giftBanner'
import giftAnima from './components/giftAnima.vue'
import candyRain from './components/candyRain.vue'
import loading from './components/loading.vue'
import Dialog from '../../components/dialog'

const showCandyRain = ref(false)
const showEmojiBoard = ref(false)
const showGiftBoard = ref(false)
const messageList: any = ref([
    {
        messageType: 'LN:TxtMsg',
        content: {
            name: '系统消息',
            desc: 'item.desc',
            content: '欢迎来到小谢的空间',
            ext: {
                user_info: {
                    nickname: '',
                    avatar_info: {
                        avatar_path: '',
                        avatar_host: ''
                    }
                }
            }
        }
    }
])

const initScroll = () => {
    let scrollContentEl = document.querySelector('.message-content') as HTMLElement
    let scrollWrapperEl = document.querySelector('.message-wrapper') as HTMLElement
    if (scrollContentEl?.scrollHeight <= scrollWrapperEl?.clientHeight) return
    let messageEls = document.getElementsByClassName('message-item')
    if (messageEls && messageEls.length) {
        messageEls[messageEls.length - 1].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
    }
}

const senExp = (item: any) => {
    console.log(item)
    let data = {
        messageType: 'LN:SigExpMsg',
        content: {
            name: item.name,
            desc: item.desc,
            url: item.url,
            result_urls: item.result_urls,
            preview_url: item.preview_url,
            ext: {
                user_info: {
                    nickname: '麻瓜谢',
                    avatar_info: {
                        avatar_path: '',
                        avatar_host: ''
                    }
                },
                result: item.result_urls[item ?. result_urls ?. length ? Math.floor(Math.random() * item.result_urls.length) : 1]
            }
        }
    }
    messageList.value.push(data)
    setTimeout(() => {
        initScroll()
    }, 0);
}

const giftBannerList: any = ref([])
const waitGiftList: any = ref([])
const sendGift = (gift: any, amount: any) => {
    giftAnimaList.value.push(gift.value.content)
    gift.value.gift_number = amount.value
    let same_i = giftBannerList.value.findIndex((g: any) => gift.value.name === g.gift.name && gift.value.gift_number === g.gift.gift_number)
    if (same_i > -1) {
        giftBannerList.value[same_i].reset()
    } else {
        if (giftBannerList.value.length >= 3) {
            let i = waitGiftList.value.findIndex((g: any) => gift.value.name === g.name && gift.value.gift_number === g.gift_number)
            if (i > -1) {
                waitGiftList.value[i].number = waitGiftList.value[i].number ? waitGiftList.value[i].number += 1 : 1
            } else {
                gift.value.number = 1
                waitGiftList.value.push(gift.value)
            }
            return
        }
        gift.value.number = 1
        let banner = new GiftBanner(gift.value, giftBannerList, checkWaitGiftList, document.querySelector('.gift-flow-content'))
        giftBannerList.value.push(banner)
        showGiftAnima.value = true
    }
}

const checkWaitGiftList = () => {
    if (waitGiftList.value.length) {
        let banner = new GiftBanner(waitGiftList.value[0], giftBannerList, checkWaitGiftList, document.querySelector('.gift-flow-content'))
        giftBannerList.value.push(banner)
        waitGiftList.value.shift()
    }
}


let giftAnimaList: any = ref([])
let showGiftAnima = ref(false)
const animaListPlay = () => {
    giftAnimaList.value.shift()
    if (!giftAnimaList.value.length) {
        showGiftAnima.value = false
    } else {
        showGiftAnima.value = false
        setTimeout(() => {
            showGiftAnima.value = true
        }, 700)
    }
}

const rainInfo = ref()
const showRedBagLoading = ref(false)

const showCandy = () => {
    rainInfo.value = {
        type: Math.random() > 0.5 ? 7 : 8,
        duration: 13
    }
    showCandyRain.value = true
}

const finishRain = () => {
    showRedBagLoading.value = true
}

const finishCalc = (getList: any) => {
    showRedBagLoading.value = false
    showCandyRain.value = false
    Dialog({
        showMask: true,
        title: getList?.length ? `恭喜你获得了<span style="color: #F5A413">${getList.length * 10}贝壳</span>` : `十分不巧，您与${rainInfo.value.type === 7 ? '糖果' : '红包'}擦身而过`,
        type: 'alert',
        status: getList?.length ? 'shell' : 'plz',
        confirmBtn: '确认'
    })
    rainInfo.value = ''
}


const tracks: any = ref([])
const micMute = ref(false)
const carMute = ref(false)

const getUserMic = async () => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((MediaStream: any) => {
        const videoElement = document.querySelector(".local-video") as HTMLVideoElement
        videoElement.srcObject = MediaStream
        videoElement.play();
        tracks.value = MediaStream.getTracks()
    })
}

const closeMedia = (type: string) => {
    if (type === 'all') {
        tracks.value.forEach((track: any) => track.stop())
        tracks.value = []
        return
    }
    tracks.value.forEach((track: any) => {
        if (track.kind === type) {
            track.enabled = !track.enabled
            type === 'audio' && (micMute.value = !track.enabled)
            type === 'video' && (carMute.value = !track.enabled)
        }
    })
}

const message = ref()
const sendMessage = (msg: any) => {
    const inputEl = document.querySelector('.input') as HTMLInputElement
    if (typeof msg !== 'string' && !message.value) {
        window.alert('请输入内容')
        inputEl.focus()
        return
    }
    messageList.value.push({
        messageType: 'LN:TxtMsg',
        content: {
            name: '',
            desc: 'item.desc',
            content: typeof msg === 'string' ? msg : message.value,
            ext: {
                user_info: {
                    nickname: `用户${Math.ceil(Math.random() * 10)}`,
                    avatar_info: {
                        avatar_path: '',
                        avatar_host: ''
                    }
                }
            }
        }
    })
    setTimeout(() => {
        initScroll()
        message.value = ''
    }, 0);
}

</script>

<template>
    <div id="map">
        <div class="video-wrapper">
            <video class="local-video"></video>
            <div v-show="!tracks.length" class="control">
                <button @click="getUserMic">
                    打开摄像头
                </button>
            </div>
            <div v-show="tracks && tracks.length" class="control">
                <button @click="closeMedia('audio')">{{micMute ? '打开' : '关闭'}}麦克风</button>
                <button @click="closeMedia('all')">关闭推流</button>
                <button @click="closeMedia('video')">{{carMute ? '打开' : '关闭'}}摄像头</button>
            </div>
        </div>
        <div class="message-wrapper">
            <div class="message-content">
                <div class="message-item" v-for="(item, index) in messageList" :key="index">
                    <message-item :item="item" />
                </div>
            </div>
        </div>
        <footer class="flexTC input-area">
            <div class="input">
                <form rel="next" @submit.prevent="sendMessage">
                    <input class="db" ref="input" enterkeyhint="send" type="text" v-model="message" :placeholder="message ? ' ' : '送上祝福...'">
                </form>
            </div>
            <img src="https://cdn1.didiapp.com/wedding/icon-face.png" @click="showEmojiBoard = true" alt="">
            <img src="https://cdn1.didiapp.com/wedding/icon-gift.png" @click="showGiftBoard = true" alt="">
            <img src="https://cdn1.didiapp.com/wedding/icon-redbag.png" @click="showCandy" alt="">
        </footer>

        <div class="gift-flow-content"></div>
        <gift-anima v-if="showGiftAnima && giftAnimaList.length" :item="giftAnimaList[0]" @animaListPlay="animaListPlay" />
        <emoji-board v-if="showEmojiBoard" @closeEmojiBoard="showEmojiBoard = false" @senExp="senExp" />
        <gift-board v-if="showGiftBoard" @closeGiftBoard="showGiftBoard = false" @sendGift="sendGift" />
        <candy-rain v-if="showCandyRain" :rainInfo="rainInfo" @finishRain="finishRain" @finishCalc="finishCalc" />
        <loading v-if="showRedBagLoading" :rainInfo="rainInfo" />
    </div>
</template>

<style lang="scss" scoped>
@import "@/styles/themes";
$clientW: calc(var(--vw_px) * 100);

#map {
    position: relative;
    width: 100%;

    .video-wrapper {
        position: relative;
        width: 100%;
        height: calc(60% - 50px);
        .local-video {
            position: absolute;
            right: 20px;
            top: 20px;
            width: 200px;
            border-radius: 38px;
            @include bg_color_reverse();
        }
        .control {
            position: absolute;
            bottom: 40px;
            left: 40px;
            width: calc(100% - 80px);
            display: flex;
            justify-content: space-between;
            button {
                width: 88px;
                height: 40px;
                border-radius: 20px;
                font-size: 14px;
                border: none;
                @include bg_color_reverse();
                @include font_color_revers();
            }
        }
    }
    .message-wrapper {
        position: absolute;
        left: 0;
        bottom: 50px;
        height: 40%;
        width: 100%;
        padding: 10px 16px;
        border-radius: 8px 8px 0 0;
        @include bg_color();
        @include font_color();
        backdrop-filter: blur(0);
        overflow-y: scroll;
        box-shadow: 0 -4px 10px 0 #00000080;
        &::-webkit-scrollbar {
            display: none;
        }
        .message-content {
            .message-item {
                margin-bottom: 6px;
            }
        }
        .message-num {
            position: fixed;
            bottom: 74px;
            left: 0;
            width: 100%;
            height: 40px;
            span {
                position: relative;
                padding: 4px 10px;
                border-radius: 6px;
                font-size: 12px;
                &::after {
                    content: "";
                    position: absolute;
                    left: 50%;
                    bottom: -12px;
                    width: 12px;
                    height: 12px;
                    background-color: #fff;
                    transform: translateX(-50%);
                    clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
                }
            }
        }
    }
    .input-area {
        height: 60px;
        width: 100%;
        align-items: center;
        transition: all .3s;
        .mic {
            width: 36px;
            height: 36px;
        }
        .input {
            position: relative;
            flex: 1;
            height: 36px;
            margin-left: 10px;
            border-radius: 18px;
            background-color: #FFFFFF1A;
            transition: all .3s;
            form {
                width: 100%;
                height: 100%;
                padding: 10px;
                border-radius: 18px;
            }
            input {
                width: 100%;
                height: 100%;
                color: #ffffff !important;
                font-size: 14px !important;
                background-color: rgba($color: #000000, $alpha: 0);
                appearance: none;
                -webkit-appearance: none;
                border: none;
                &::placeholder {
                    color: #ffffff !important;
                }
            }
        }
        .gift-icon, .icon-face, .lucky-money-icon, .icon-note {
            width: 36px;
            height: 36px;
            margin-left: 10px;
        }
    }
    footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: $clientW;
        height: 50px;
        background-color: #333333;
        box-shadow: 0 -4px 10px 0 #00000080;
        img {
            width: 36px;
            height: 36px;
        }
    }
}

.gift-flow-content {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 206px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    pointer-events: none;
    z-index: 11;
}
</style>