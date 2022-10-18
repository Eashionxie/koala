<script lang="ts" setup>
import { ref, onMounted } from 'vue'
// @ts-ignore
import * as TWEEN from 'tween.js';


const micUserList = [
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    },
    {
        id: 4
    }
]
const amountTypes = [1314, 999, 520, 99, 66, 10, 6, 1]
const showAmountSelect = ref(false)
const chooseId = ref(0)
const curChoose = ref()
const pageNum = ref(0)
const giftList = [
    {
        "id": 8,
        "name": "玫瑰花",
        "profile": "",
        "type": 6,
        "content": {
            "name": "玫瑰花",
            "type": 1,
            "unit": "朵",
            "icon": "https://cdn3.didiapp.com/manager_upload/7441b69b344a46dc9fe69599e03d2734.png",
            "suffix_desc": "玫瑰玫瑰~我爱你~",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/01/data.json",
            "size_type": 1
        },
        "state": 0,
        "price": 5,
        "sort": 1,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164065,
        "update_time": 1644560984
    },
    {
        "id": 14,
        "name": "礼炮祝福",
        "profile": "",
        "type": 6,
        "content": {
            "name": "礼炮祝福",
            "type": 7,
            "unit": "个",
            "icon": "https://cdn3.didiapp.com/manager_upload/cda99582b5b04dbbaef26e900500a3ee.png",
            "suffix_desc": "气氛搞起来！我们一起来嗨皮~",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/02/data.json",
            "size_type": 1
        },
        "state": 0,
        "price": 10,
        "sort": 2,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164587,
        "update_time": 1644647274
    },
    {
        "id": 17,
        "name": "交杯酒",
        "profile": "",
        "type": 6,
        "content": {
            "name": "交杯酒",
            "type": 10,
            "unit": "组",
            "icon": "https://cdn3.didiapp.com/manager_upload/caca49a04b894bfaa40e7c7cec58883f.png",
            "suffix_desc": "一起喝了交杯酒，幸福日子天天有！",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/06/data.json",
            "size_type": 1
        },
        "state": 0,
        "price": 88,
        "sort": 3,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164768,
        "update_time": 1644647251
    },
    {
        "id": 20,
        "name": "滑板车队",
        "profile": "",
        "type": 6,
        "content": {
            "name": "滑板车队",
            "type": 13,
            "unit": "组",
            "icon": "https://cdn3.didiapp.com/manager_upload/e062b688fd9b411383a797b49623551a.png",
            "suffix_desc": "一支穿云箭，千军万马来相见！",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/10/data.json",
            "size_type": 1
        },
        "state": 0,
        "price": 250,
        "sort": 4,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164935,
        "update_time": 1644647234
    },
    {
        "id": 21,
        "name": "婚纱",
        "profile": "",
        "type": 6,
        "content": {
            "name": "婚纱",
            "type": 14,
            "unit": "件",
            "icon": "https://cdn3.didiapp.com/manager_upload/09099a0554d346ce924f4d5d85aa6351.png",
            "suffix_desc": "披上婚纱，今晚就当最闪亮的星！",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/11/data.json",
            "size_type": 1
        },
        "state": 0,
        "price": 299,
        "sort": 5,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164979,
        "update_time": 1644647227
    },
    {
        "id": 12,
        "name": "豪华车队",
        "profile": "",
        "type": 6,
        "content": {
            "name": "豪华车队",
            "type": 5,
            "unit": "组",
            "icon": "https://cdn3.didiapp.com/manager_upload/0023ade849a54b44bab00afc8883e820.png",
            "suffix_desc": "我想在跑车里，想要一辆法拉利,想要钱money money~",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/13/data.json",
            "size_type": 2
        },
        "state": 0,
        "price": 555,
        "sort": 6,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164424,
        "update_time": 1644647287
    },
    {
        "id": 13,
        "name": "飞机",
        "profile": "",
        "type": 6,
        "content": {
            "name": "飞机",
            "type": 6,
            "unit": "架",
            "icon": "https://cdn3.didiapp.com/manager_upload/ba8dd4cb7503418ca894a90b27cc66ad.png",
            "suffix_desc": "我要带你去浪漫的土耳其~然后去东京和巴黎！",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/14/data.json",
            "size_type": 2
        },
        "state": 0,
        "price": 666,
        "sort": 7,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164509,
        "update_time": 1644647282
    },
    {
        "id": 22,
        "name": "三生三世",
        "profile": "",
        "type": 6,
        "content": {
            "name": "三生三世",
            "type": 15,
            "unit": "个",
            "icon": "https://cdn3.didiapp.com/manager_upload/a94e79ec736240049bd7f94ab39ce040.png",
            "suffix_desc": "浮世万千，吾爱有三，朝、暮与卿",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/15/data.json",
            "size_type": 2
        },
        "state": 0,
        "price": 3344,
        "sort": 8,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643165034,
        "update_time": 1644647221
    },
    {
        "id": 9,
        "name": "心动",
        "profile": "",
        "type": 6,
        "content": {
            "name": "心动",
            "type": 2,
            "unit": "个",
            "icon": "https://cdn3.didiapp.com/manager_upload/22f61620c3944673959f0da41e639ae5.png",
            "suffix_desc": "触电的那种感觉~已慢慢出现~",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/03/data.json",
            "size_type": 1
        },
        "state": 0,
        "price": 30,
        "sort": 9,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164180,
        "update_time": 1644647307
    },
    {
        "id": 15,
        "name": "巧克力",
        "profile": "",
        "type": 6,
        "content": {
            "name": "巧克力",
            "type": 8,
            "unit": "盒",
            "icon": "https://cdn3.didiapp.com/manager_upload/e46ed9d2e04840c8b49fd02b9280f7d1.png",
            "suffix_desc": "巧克力再甜，也没有你的笑容甜！",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/04/data.json",
            "size_type": 1
        },
        "state": 0,
        "price": 52,
        "sort": 10,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164668,
        "update_time": 1644647265
    },
    {
        "id": 16,
        "name": "房产证",
        "profile": "",
        "type": 6,
        "content": {
            "name": "房产证",
            "type": 9,
            "unit": "本",
            "icon": "https://cdn3.didiapp.com/manager_upload/b25feb6ddace4bdf9dd0654aaa69ea18.png",
            "suffix_desc": "房产证到手，婚姻不用愁，未来的日子一路有你。",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/05/data.json",
            "size_type": 1
        },
        "state": 0,
        "price": 66,
        "sort": 11,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164709,
        "update_time": 1644647259
    },
    {
        "id": 18,
        "name": "婚鞋",
        "profile": "",
        "type": 6,
        "content": {
            "name": "婚鞋",
            "type": 11,
            "unit": "双",
            "icon": "https://cdn3.didiapp.com/manager_upload/48ae7595835e4a7fb922b6e405b84ee8.png",
            "suffix_desc": "穿上最美的婚鞋，和你走一辈子都不会累！",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/07/data.json",
            "size_type": 1
        },
        "state": 0,
        "price": 99,
        "sort": 12,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164831,
        "update_time": 1644647244
    },
    {
        "id": 19,
        "name": "手捧花",
        "profile": "",
        "type": 6,
        "content": {
            "name": "手捧花",
            "type": 12,
            "unit": "束",
            "icon": "https://cdn3.didiapp.com/manager_upload/a5199c2dc03d4ee49415bf03248bf876.png",
            "suffix_desc": "手中捧着花，心中想着TA，祝福久久久！",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/08/data.json",
            "size_type": 1
        },
        "state": 0,
        "price": 150,
        "sort": 13,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164881,
        "update_time": 1644647240
    },
    {
        "id": 10,
        "name": "喷钱枪",
        "profile": "",
        "type": 6,
        "content": {
            "name": "喷钱枪",
            "type": 3,
            "unit": "支",
            "icon": "https://cdn3.didiapp.com/manager_upload/d3d35ce61225459c89015329fc82f3b1.png",
            "suffix_desc": "咻~咻~咻~阔少出巡，大家免礼！",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/09/data.json",
            "size_type": 1
        },
        "state": 0,
        "price": 200,
        "sort": 14,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164278,
        "update_time": 1644647302
    },
    {
        "id": 11,
        "name": "漫天烟火",
        "profile": "",
        "type": 6,
        "content": {
            "name": "漫天烟火",
            "type": 4,
            "unit": "场",
            "icon": "https://cdn3.didiapp.com/manager_upload/b36d799d9a7a4b76a91a2d63b7b3d6a7.png",
            "suffix_desc": "“哧”的一声，导火线被点燃，漂亮的烟火为你绽开，听说看到的人都会变得无敌幸运！",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/12/data.json",
            "size_type": 2
        },
        "state": 0,
        "price": 520,
        "sort": 15,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643164336,
        "update_time": 1644647294
    },
    {
        "id": 23,
        "name": "守护神之翼",
        "profile": "",
        "type": 6,
        "content": {
            "name": "守护神之翼",
            "type": 16,
            "unit": "个",
            "icon": "https://cdn3.didiapp.com/manager_upload/e54be0cf96b0451292f3fdf6d3c36ffa.png",
            "suffix_desc": "我愿变成童话里你爱的那个天使，张开双手变成翅膀守护你~",
            "effect": "https://cdn1.didiapp.com/wedding/gift_anima/16/data.json",
            "size_type": 2
        },
        "state": 0,
        "price": 5200,
        "sort": 16,
        "discount_price": 0,
        "discount_start_time": 0,
        "discount_end_time": 0,
        "start_time": 0,
        "end_time": 0,
        "xlab": 0,
        "create_time": 1643165084,
        "update_time": 1644647215
    }
]
const amount = ref()
const userAssets = {
    lovecoin: {
        amount: 999999
    }
}
const selectStatus = ref(0)
const chooseList: any = ref([])


const sendData = ref({
    product_id: '',
    extra_data: {
        recipient_ids: '',
        room_id: -1,
        gift_number: '',
        user_identity: 4,
        gift_scope: 0
    }
})
const userTypeMap = ref({
    BRIDEGROOM: 1,
    BRIDE: 2,
    CEREMONY_HOST: 3,
    GUEST_FRIEND: 4,
    GUEST_FEMALE: 5,
    GUEST_MALE: 6
})

const emit = defineEmits(['sendGift', 'closeGiftBoard'])


    // watch: {
    //     chooseList: {
    //         deep: false,
    //         handler(val) {
    //             if (val.length === 0) return this.selectStatus = 0
    //             if (val.length === this.micUserList ?. length) return this.selectStatus = 2
    //             return this.selectStatus = 1
    //         }
    //     }
    // },   
const outElW = ref()
const innerElW = ref()
const innerL = ref('0%')
const scrollW = ref()
const computedInnerL = (e: any) => {
    let distance = outElW.value - innerElW.value
    innerL.value = `${e.target.scrollLeft / (scrollW.value - e.target.clientWidth) * 100 * (distance / outElW.value)}%`
}

const _getGifts = () => {
    curChoose.value = giftList[chooseId.value]
    pageNum.value = Math.ceil(giftList.length / 8) ? Math.ceil(giftList.length / 8) : 1
}

const send = () => {
    emit('sendGift', curChoose, amount)
    close()
}
const choose = (item: any) => {
    let index = chooseList.value.findIndex((v: any) => v.id === item.id)
    if (index > -1) {
        chooseList.value.splice(index, 1)
    } else {
        chooseList.value.push(item)
    }
}
const chooseGift = (item: any, i: number) => {
    chooseId.value = i
    curChoose.value = item
}
const changePage = (i: number) => {
    let chooseIndex = chooseId.value + 8 * i
    curChoose.value = giftList[chooseIndex]
}
const chooseAmount = (item: any) => {
    amount.value = item
    showAmountSelect.value = false
}
const changeChooses = () => {
    if (chooseList.value.length === micUserList ?. length) {
        chooseList.value = []
        selectStatus.value = 0
        return
    }
    if (chooseList.value.length < micUserList ?. length) {
        chooseList.value = JSON.parse(JSON.stringify(micUserList))
        selectStatus.value = 2
    }
}

const close = () => {
    const maskEl = document.querySelector('.mask-gift-board') as HTMLElement
    const containerEl = document.querySelector('.gift-content') as HTMLElement
    new TWEEN.Tween({ y: 0, opacity: .5 })
    .to({ y: 100, opacity: 0 }, 200)
    .onUpdate(function () {
        // @ts-ignore
        containerEl.style.bottom = `-${this.y}%`
        // @ts-ignore
        maskEl.style.background = `rgba(0, 0, 0, ${this.opacity})`
    })
    .onComplete(() => {
        emit('closeGiftBoard')
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
    _getGifts()
    let outEl = document.querySelector('.page-index') as HTMLElement
    let innerEl = document.querySelector('.inner') as HTMLElement
    let scrollEL = document.querySelector('.slid-content') as HTMLElement
    outElW.value = outEl?.clientWidth
    innerElW.value = innerEl?.clientWidth
    scrollW.value = document.body.clientWidth * pageNum.value
    console.log(scrollW.value)
    scrollEL?.addEventListener('scroll', computedInnerL)
    amount.value = amountTypes[amountTypes.length - 1]
    chooseList.value = JSON.parse(JSON.stringify(micUserList))
    selectStatus.value = 2
})
</script>

<template>
    <div class="mask-gift-board" @click.self="close">
        <div class="gift-content">
            <div v-if="showAmountSelect" class="mask-amount" @click.self="showAmountSelect = false"></div>
            <div class="user-list flexBT">
                <div class="icon flexCC c-66 font14">送给</div>
                <div class="user-list-content">
                    <div class="user" v-for="(item, index) in micUserList" :key="index" @click="choose(item)">
                        <div v-show="chooseList.findIndex((v:any) => v.id === item.id) > -1" class="choose-sign flexCC">
                            <img src="https://cdn1.didiapp.com/wedding/checked.png" alt="">
                        </div>
                        <img class="avatar" src="https://cdn1.didiapp.com/wedding/default-avatar.png" alt="">
                    </div>
                </div>
                <div class="select-all flex" @click="changeChooses">
                    <img :src="`https://cdn1.didiapp.com/wedding/select-${selectStatus}.png`" alt="">
                    <span class="c-99 font12">全选</span>
                </div>
            </div>
            <div style="height: 5px"></div>
            <div class="slid-content flex">
                <div class="gift-list flex" v-for="(p, index) in pageNum" :key="index">
                    <div
                        :class="{'active': item.id === curChoose.id}"
                        class="gift-item flexTC"
                        v-for="(item, i) in giftList.slice((p - 1) * 8, p * 8)"
                        :key="i"
                        @click="chooseGift(item, i)">
                        <img class="gift-icon" :src="item.content.icon" alt="">
                        <span class="name font12 c-11">{{item.name}}</span>
                        <div class="price flexCC">
                            <img src="https://cdn1.didiapp.com/lovecoin/lovecoin.png" alt="">
                            <span class="font14 c-66">{{item.price}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-index flexCC">
                <span class="inner" :style="{left: innerL}"></span>
            </div>
            <div class="money-action flexBT">
                <div class="balance flexBT">
                    <img class="lovecoin" src="https://cdn1.didiapp.com/lovecoin/lovecoin.png" alt="">
                    <p class="fontHv font5w c-11 balance-number">{{userAssets.lovecoin ? userAssets.lovecoin.amount : 0}}</p>
                    <div class="to-topup c-red">
                        <span class="fontHv font5w">充值</span>
                        <span class="iconfont icon-previewright font20"></span>
                    </div>
                </div>
                <div class="send-area flex">
                    <div v-if="showAmountSelect" class="select-items">
                        <div v-for="(item, index) in amountTypes" :key="index" @click="chooseAmount(item)" class="flexCC">
                            {{item}}
                        </div>
                    </div>
                    <div class="number flexCC" @click="showAmountSelect = !showAmountSelect">
                        <span class="c-11 fontHv font5w">{{amount}}</span>
                        <span class="iconfont icon-previewright c-99"></span>
                    </div>
                    <div class="btn flexCC c-white fontHv font5w" @click="send">
                        赠送
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/styles/themes";
$clientW: calc(var(--vw_px) * 100);

.mask-gift-board {
    position: absolute;
    left: 0;
    bottom: 0;
    width: $clientW;
    height: 100%;
    background-color: #00000080;
    z-index: 99;
    animation: bgIn .3s;
}
.gift-content {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    @include bg_color();
    border-radius: 10px 10px 0 0;
    z-index: 10;
    .mask-amount {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10;
    }
    .user-list {
        position: relative;
        height: 60px;
        width: calc(100% - 32px);
        padding: 10px 0;
        margin-left: 16px;
        overflow: hidden;
        .icon {
            width: 40px;
            height: 40px;
        }
        .user-list-content {
            flex: 1;
            display: flex;
            overflow-x: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        .user {
            position: relative;
            height: 36px;
            width: 36px;
            flex-shrink: 0;
            margin-left: 10px;
            .avatar {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
            .tag {
                position: absolute;
                top: 24px;
                left: 50%;
                width: 34px;
                height: 16px;
                border: none;
                transform: translateX(-50%);
            }
            .choose-sign {
                position: absolute;
                right: 0;
                top: 0;
                width: 16px;
                height: 16px;
                border: 1px solid #ffffff;
                border-radius: 50%;
                background-color: #26D93E;
                img {
                    width: 10px;
                    height: 8px;
                }
            }
        }
        .select-all {
            width: 40px;
            height: 100%;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;
            img {
                width: 20px;
                height: 20px;
                margin-right: 2px;
                margin-bottom: 4px;
            }
        }
    }
    .slid-content {
        width: $clientW;
        padding: 20px 0;
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
        flex-shrink: 0;
        width: 100%;
        flex-wrap: wrap;
        padding: 5px 15px 15px 15px;
        .gift-item {
            width: 25%;
            height: 100px;
            padding: 5px;
            border-radius: 10px;
            border: 1px solid transparent;
            flex-direction: column;
            transition: all .1s;
            .gift-icon {
                width: 55px;
                height: 55px;
            }
            .name {
                height: 18px;
                line-height: 18px;
            }
            .price {
                height: 18px;
                line-height: 18px;
                img {
                    width: 12px;
                    height: 12px;
                    margin-right: 5px;
                }
            }
        }
        .active {
            border: 1px solid #FD536E;
        }
    }
    .page-index {
        position: fixed;
        bottom: 76px;
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
    .money-action {
        align-items: center;
        height: 60px;
        padding: 10px 16px;
        margin-top: 10px;
        .balance {
            align-items: center;
            .lovecoin {
                width: 24px;
                height: 24px;
                margin-right: 4px;
            }
            .to-topup {
                margin-left: 10px;
                .icon-previewright {
                    position: relative;
                    top: 1px;
                    left: -2px;
                }
            }
        }
        .send-area {
            position: relative;
            width: 160px;
            height: 40px;
            .number, .btn {
                width: 50%;
                box-sizing: content-box;
            }
            .number {
                position: relative;
                border: 1px solid rgba($color: #000000, $alpha: .1);
                border-radius: 20px 0 0 20px;
                z-index: 11;
            }
            .btn {
                border-radius: 0 20px 20px 0;
                background: linear-gradient(to right, #FD536E, #FF70B5);
            }
            .select-items {
                position: absolute;
                display: flex;
                flex-direction: column;
                left: 0;
                bottom: 0;
                width: calc(50% + 1px);
                padding: 0 6px 38px 6px;
                overflow: hidden;
                border-radius: 10px 10px 0 20px;
                @include bg_color();
                border: 1px solid rgba($color: #000000, $alpha: .1);
                z-index: 10;
                transform-origin: bottom;
                animation: showIn .3s;
                div {
                    width: 100%;
                    height: 40px;
                    border-bottom: 1px solid rgba($color: #000000, $alpha: .05);
                    &:last-of-type {
                        border: none;
                    }
                }
            }
        }
    }
}

@keyframes bgIn {
    0% { background-color: #00000000; }
    100% { background-color: #00000080; }
}

@keyframes showIn {
    0% { transform: scaleY(0); opacity: 0; }
    100% { transform: scaleY(1); opacity: 1; }
}
</style>