<script lang="ts" setup>
import {
    ref,
    computed,
    onMounted,
    defineEmits,
onActivated
} from 'vue'

// @ts-ignore
import * as TWEEN from 'tween.js';

const emit = defineEmits(['closeEmojiBoard', 'senExp'])

const emojiTimer: any = ref()
const emojiList: any = ref([])
emojiList.value = [{
        "id": 2,
        "name": "同意",
        "url": "https://cdn3.didiapp.com/manager_upload/45ed8b0f1ec746a49f4719e1b4f39c66.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/433fb88ec95b4ff297d919f8d29f1034.png",
        "result_urls": [],
        "height": 20,
        "width": 20,
        "desc": "同意",
        "sort": 1,
        "status": 1,
        "type": 0,
        "create_time": 1643164930,
        "update_time": 1643164930
    },
    {
        "id": 3,
        "name": "反对",
        "url": "https://cdn3.didiapp.com/manager_upload/e4028dd53cc545ab950c13985765429a.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/05e246e35990469dbda0803c6c316439.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "反对",
        "sort": 2,
        "status": 1,
        "type": 0,
        "create_time": 1643164964,
        "update_time": 1643164964
    },
    {
        "id": 4,
        "name": "我要上麦",
        "url": "https://cdn3.didiapp.com/manager_upload/4b69acedc5064407a47f7a94eaea01ef.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/771545a19a974b6ebbf056dd7d0f7e9d.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "我要上麦！",
        "sort": 3,
        "status": 1,
        "type": 1,
        "create_time": 1643165026,
        "update_time": 1643165026
    },
    {
        "id": 5,
        "name": "哭",
        "url": "https://cdn3.didiapp.com/manager_upload/ce2ac899827c4644b0f13e8a1354b63e.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/c92d670d9483482d9a6d7418a0c0cca8.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "哭",
        "sort": 4,
        "status": 1,
        "type": 0,
        "create_time": 1643165064,
        "update_time": 1643165064
    },
    {
        "id": 6,
        "name": "心痛",
        "url": "https://cdn3.didiapp.com/manager_upload/e2bb940f1e3a4c95b30bd7556e7db00e.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/546c164422d047b7a71fd6f57d461be6.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "心痛",
        "sort": 5,
        "status": 1,
        "type": 0,
        "create_time": 1643165136,
        "update_time": 1643165136
    },
    {
        "id": 7,
        "name": "OK",
        "url": "https://cdn3.didiapp.com/manager_upload/0becfbf9b434411ca40179af38ef1583.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/7e4677372154472bac4a932a93380f01.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "OK",
        "sort": 6,
        "status": 1,
        "type": 0,
        "create_time": 1643165167,
        "update_time": 1643165167
    },
    {
        "id": 8,
        "name": "跳舞",
        "url": "https://cdn3.didiapp.com/manager_upload/9f8109c30bcf485da84d8d9c51e06131.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/844d1ec14a064aa39733fb3fe679b8c0.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "dance",
        "sort": 7,
        "status": 1,
        "type": 0,
        "create_time": 1643165200,
        "update_time": 1643165200
    },
    {
        "id": 9,
        "name": "飞吻",
        "url": "https://cdn3.didiapp.com/manager_upload/2abc9faa016c456c8dfbc151e61a7794.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/e5e32cb8e9ff4d87b25965e4a397fe36.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "mua",
        "sort": 8,
        "status": 1,
        "type": 0,
        "create_time": 1643165232,
        "update_time": 1643165232
    },
    {
        "id": 10,
        "name": "柠檬精",
        "url": "https://cdn3.didiapp.com/manager_upload/c2124bb563ad43858c72fe3da22849e4.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/4f1a55df92d849fe92b75b1900101111.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "酸",
        "sort": 9,
        "status": 1,
        "type": 0,
        "create_time": 1643165265,
        "update_time": 1643165265
    },
    {
        "id": 11,
        "name": "嘚瑟",
        "url": "https://cdn3.didiapp.com/manager_upload/eeaca6d555fa4701a1b4dc8fb753fc3c.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/30581de8be5f4054b8106a67b3813697.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "酷",
        "sort": 10,
        "status": 1,
        "type": 0,
        "create_time": 1643165310,
        "update_time": 1643165661
    },
    {
        "id": 12,
        "name": "捂脸",
        "url": "https://cdn3.didiapp.com/manager_upload/e60dd1ee3bb3402db9b33bc9689cf0c1.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/e40f3e0ab7054382a8fb5a21c5b1f43c.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "捂脸",
        "sort": 11,
        "status": 1,
        "type": 0,
        "create_time": 1643165358,
        "update_time": 1643165358
    },
    {
        "id": 13,
        "name": "大佬",
        "url": "https://cdn3.didiapp.com/manager_upload/c3dca1b4e26d435da9ed01bcb45f34ab.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/7e7f475d115743dfa1c7ee7fa3deb655.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "1",
        "sort": 12,
        "status": 1,
        "type": 0,
        "create_time": 1643165386,
        "update_time": 1643165386
    },
    {
        "id": 14,
        "name": "辣眼睛",
        "url": "https://cdn3.didiapp.com/manager_upload/e6564cea1be84525a13d36b33682e048.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/306b13c0c7a148968cdd7ead36a25072.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "1",
        "sort": 13,
        "status": 1,
        "type": 0,
        "create_time": 1643165418,
        "update_time": 1643165418
    },
    {
        "id": 15,
        "name": "裂开",
        "url": "https://cdn3.didiapp.com/manager_upload/83f004a97c8a414a995ac34649571d38.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/e34c9915e42c472988fb9e9c2f93490e.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "1",
        "sort": 14,
        "status": 1,
        "type": 0,
        "create_time": 1643165450,
        "update_time": 1643165450
    },
    {
        "id": 16,
        "name": "谢谢老板",
        "url": "https://cdn3.didiapp.com/manager_upload/b111bd0d0261439b8d7c27bb64be3463.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/2059ef652cd145568b9372c639acf4a7.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "1",
        "sort": 15,
        "status": 1,
        "type": 0,
        "create_time": 1643165481,
        "update_time": 1643165481
    },
    {
        "id": 17,
        "name": "叼玫瑰",
        "url": "https://cdn3.didiapp.com/manager_upload/3163efdc79aa4770a87d20ad27ed820f.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/193e16b74da149208056af0031d5b0bc.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "1",
        "sort": 16,
        "status": 1,
        "type": 0,
        "create_time": 1643165513,
        "update_time": 1643165513
    },
    {
        "id": 18,
        "name": "心动爆灯",
        "url": "https://cdn3.didiapp.com/manager_upload/606d312533e5473e8fd9657122374cab.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/b1c8a3d68ef54e629a0eaac20173b3d7.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "1",
        "sort": 17,
        "status": 1,
        "type": 0,
        "create_time": 1643165557,
        "update_time": 1643165562
    },
    {
        "id": 19,
        "name": "赞",
        "url": "https://cdn3.didiapp.com/manager_upload/6cd7b519696b45918b56231833c8fbad.gif",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/f6266382819c4925aced834db35639b2.png",
        "result_urls": [],
        "height": 1,
        "width": 1,
        "desc": "1",
        "sort": 18,
        "status": 1,
        "type": 0,
        "create_time": 1643165586,
        "update_time": 1643165586
    },
    {
        "id": 1,
        "name": "摇骰子",
        "url": "https://cdn1.didiapp.com/wedding/emoji/%E9%AA%B0%E5%AD%90/data.json",
        "preview_url": "https://cdn3.didiapp.com/manager_upload/71d05454a99247c39092eb5c35e89199.png",
        "result_urls": [
            "https://cdn3.didiapp.com/manager_upload/e07c5ce4d4d04afb88d03d29301a18b7.png",
            "https://cdn3.didiapp.com/manager_upload/bcdf2e9eae5b4810b5d42bd18077fcd3.png",
            "https://cdn3.didiapp.com/manager_upload/6d015c8f7edc4e9abcef0e2af8bed293.png",
            "https://cdn3.didiapp.com/manager_upload/57630a112fe7448b86eb78da6d8e18f4.png",
            "https://cdn3.didiapp.com/manager_upload/e1c34c2c7b8a4d92b0489ce8a6398b53.png",
            "https://cdn3.didiapp.com/manager_upload/b2d537aac3de442080594f487fbcaa4f.png"
        ],
        "height": 20,
        "width": 20,
        "desc": "摇骰子",
        "sort": 22,
        "status": 1,
        "type": 0,
        "create_time": 1643164889,
        "update_time": 1643164889
    }
]

const send = (item: any) => {
    if (emojiTimer.value) return
    emit('senExp', item)
    // close()
    emojiTimer.value = setTimeout(() => {
        clearTimeout(emojiTimer.value)
        emojiTimer.value = null
    }, 500);
}

const pageNum = computed(() => {
    if (!emojiList.value?.length) return 0
    return Math.ceil(emojiList.value.length / 8) ? Math.ceil(emojiList.value.length / 8) : 1
})

const outElW = ref()
const innerElW = ref()
const innerL = ref()
const scrollW = ref()
const computedInnerL = (e: any) => {
    let distance = outElW.value - innerElW.value
    innerL.value = `${e.target.scrollLeft / (scrollW.value - e.target.clientWidth) * 100 * (distance / outElW.value)}%`
}

const close = () => {
    const maskEl = document.querySelector('.emoji-board') as HTMLElement
    const containerEl = document.querySelector('.slid-content') as HTMLElement
    new TWEEN.Tween({ y: 0, opacity: .5 })
    .to({ y: 100, opacity: 0 }, 200)
    .onUpdate(function () {
        // @ts-ignore
        containerEl.style.bottom = `-${this.y}%`
        // @ts-ignore
        maskEl.style.background = `rgba(0, 0, 0, ${this.opacity})`
    })
    .onComplete(() => {
        emit('closeEmojiBoard')
    })
    .start()
    function animate() {
        if (TWEEN.update()) {
            requestAnimationFrame(animate);
        }
    }
    animate()
}

onMounted(() => {
    let outEl = document.querySelector('.page-index') as HTMLElement
    let innerEl = document.querySelector('.inner') as HTMLElement
    let scrollEL = document.querySelector('.slid-content') as HTMLElement
    outElW.value = outEl?.clientWidth
    innerElW.value = innerEl?.clientWidth
    scrollW.value = scrollEL?.scrollWidth
    scrollEL?.addEventListener('scroll', computedInnerL)
})

</script>

<template>
    <div class="emoji-board" @click.self.stop="close">
        <div class="slid-content flex">
            <div class="gift-list flex" v-for="(p, index) in pageNum" :key="index">
                <div class="gift-item flexTC" v-for="(emoji, i) in emojiList.slice((p - 1) * 8, p * 8)" :key="i" @click="send(emoji)">
                    <img class="gift-icon" :src="emoji.preview_url" alt="">
                    <span class="name c-11 font12">{{emoji.name}}</span>
                </div>
            </div>
            <div class="page-index">
                <span class="inner" :style="{left: innerL}"></span>
            </div>
            <div class="close-btn flexCC" @click="close">关闭</div>
        </div>
    </div>
    </template>

<style lang="scss" scoped>
@import "@/styles/themes";
$clientW: calc(var(--vw_px) * 100);

.emoji-board {
    position: absolute;
    left: 0;
    bottom: 0;
    width: $clientW;
    height: 100%;
    background-color: #00000080;
    z-index: 99;
    animation: bgIn .3s;
    .slid-content {
        position: absolute;
        left: 0;
        bottom: 0;
        width: $clientW;
        padding: 20px 0 66px 0;
        @include bg_color();
        border-radius: 10px 10px 0 0;
        overflow-x: scroll;
        @include bottomPop();
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }

    .gift-list {
        position: relative;
        flex-wrap: wrap;
        width: 100%;
        flex-shrink: 0;
        padding: 8px 16px 14px 16px;
        .gift-item {
            width: 25%;
            padding: 5px;
            border-radius: 10px;
            flex-direction: column;

            .gift-icon {
                width: 58px;
                height: 58px;
            }

            .name {
                line-height: 16px;
                margin-top: 10px;
            }
        }
    }

    .page-index {
        position: fixed;
        bottom: 56px;
        left: calc(50% - 30px);
        width: 60px;
        height: 4px;
        margin-top: 16px;
        border-radius: 4px;
        @include bg_color_reverse();
        overflow: hidden;

        .inner {
            position: absolute;
            height: 4px;
            width: 25px;
            border-radius: 4px;
            background: #FF7474;
        }
    }

    .close-btn {
        position: fixed;
        bottom: 0;
        width: $clientW;
        height: 44px;
        border-top: 1px solid;
        @include border_color();
    }
}

@keyframes bgIn {
    0% { background-color: #00000000; }
    100% { background-color: #00000080; }
}
</style>
