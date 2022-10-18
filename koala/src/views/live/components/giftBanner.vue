<script lang="ts" setup>
import { defineProps } from 'vue'

const prop = defineProps({
    item: {
        type: Object
    },
    showScale: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div>
        <transition name="fade" mode="out-in">
            <div v-if="item" class="flow-item flexBT">
                <img class="avatar" src="https://cdn1.didiapp.com/wedding/default-avatar.png" alt="">
                <div class="main-text">
                    <span class="nickname font14">{{'麻瓜谢'}}</span>
                    <p class="gift-name">
                        <span class="c-white">送给麻瓜谢</span>
                        <!-- <span class="name">{{item.ext.gift.gift_number}}</span> -->
                        <!-- <span class="name">{{item.ext.gift.unit}}</span> -->
                        <span class="name fontHv font5w">{{item.name}}</span>
                    </p>
                </div>
                <div class="gift-icon">
                    <img :src="item.content.icon" alt="">
                </div>
                <div class="number c-white" :class="{'numScale': showScale}">
                    <span style="margin-right: 2px">x</span>
                    <span class="font22 fontHv font5w">{{item.gift_number * item.number}}</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
.flow-item {
    position: relative;
    width: 200px;
    height: 56px;
    padding: 6px 20px 6px 6px;
    align-items: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transition: all .3s;
    .avatar {
        width: 32px;
        height: 32px;
        margin-right: 6px;
        border-radius: 50%;
        border: 1px solid #ffffff;
    }
    .main-text {
        position: relative;
        flex: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        .nickname, .name {
            color: #FFF9C5;
        }
        .gift-name {
            position: relative;
            transform: scale(.86);
            transform-origin: left;
            span {
                font-size: 12px !important;
            }
            .name {
                position: relative;
                margin-left: 2px;
            }
        }
    }
    .gift-icon {
        img {
            width: 36px;
            height: 36px;
        }
    }
    .number {
        position: absolute;
        left: calc(100% - 14px);
        bottom: 4px;
        text-shadow: 0 1px 4px rgba($color: #000000, $alpha: .35);
        animation: numScaleAni .4s ease-out;
        span {
            vertical-align: baseline;
        }
    }
}

.numScale {
    animation: numScaleAni2 .3s ease-out !important;
}

.fade-enter-active, .fade-leave-active {
    transition: all .3s;
}

.fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateY(40px) scale(.5);
}

@keyframes numScaleAni {
    0% { transform: scale(2); opacity: 0; }
    50% { transform: scale(2); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

@keyframes numScaleAni2 {
    0% { transform: scale(2); opacity: 0; }
    1% { transform: scale(2); opacity: .3; }
    100% { transform: scale(1); opacity: 1; }
}
</style>