<script lang="ts" setup>

const prop = defineProps({
    rainInfo: {
        type: Object
    }
})

</script>

<template>
    <div class="loading-se-mask flexCC">
        <div class="content">
            <img v-if="prop.rainInfo" :src="`https://cdn1.didiapp.com/wedding/redbag-${prop.rainInfo.type === 7 ? 3 : 2}.png`" alt="">
            <p class="tac c-11 fontHv font5w">结算中，请耐心等待</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/styles/themes";
.loading-se-mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: .5);
    animation: bgIn .3s;
    z-index: 12;
    .content {
        width: calc(100% - 90px);
        padding: 20px 16px 40px 16px;
        border-radius: 10px;
        text-align: center;
        animation: contentIn .3s;
        @include bg_color();
        img {
            width: 80px;
            margin-bottom: 20px;
        }
    }
}

@keyframes bgin {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

@keyframes contentIn {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
}
</style>