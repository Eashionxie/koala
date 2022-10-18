<script lang="ts" setup>
import lottie from 'lottie-web'
import { onMounted, ref } from 'vue'

const animation = ref()
const showMask = ref(true)

const emit = defineEmits(['animaListPlay'])
const prop = defineProps({
    item: {
        type: Object
    }
})

const initAnima = () => {
    animation.value && animation.value.destroy()
    animation.value = null
    let el = document.body.querySelector('#anima')
    if (!el) return
    animation.value = lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: prop.item?.effect
    })
    animation.value.addEventListener('DOMLoaded', () => {
        showMask.value = true
        animation.value.play()
    })
    animation.value.addEventListener('complete', () => {
        animation.value && animation.value.destroy()
        showMask.value = false
        emit('animaListPlay')
    })
}

onMounted(() => {
    initAnima()
})
</script>

<template>
    <div v-if="item" class="anima-content flexCC" :class="{'anima-mask': showMask && item.size_type === 2}">
        <div ref="anima" id="anima" :class="[item.size_type === 2 ? 'full-size' : 'middle-size']"></div>
    </div>
</template>

<style lang="scss" scoped>
.anima-mask {
    background-color: rgba($color: #000000, $alpha: .5);
}
.anima-content {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 10;
    .middle-size {
        width: 250px;
        height: 250px;
    }
    .full-size {
        position: absolute;
        left: 0;
        bottom: -4px;
        width: 100vw;
        height: auto;
    }
}
</style>