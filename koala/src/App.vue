<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const isDark = ref(false)
if (localStorage.getItem('app_theme') === 'theme1') {
    isDark.value = true
} else {
    isDark.value = false
}

watchEffect(() => {
    if (isDark.value) {
        document.documentElement.dataset.theme = 'theme1'
        localStorage.setItem('app_theme', 'theme1')
    } else {
        document.documentElement.dataset.theme = 'theme'
        localStorage.setItem('app_theme', 'theme')
    }
})

const vw_px = ref('0px')
const is_pc = ref(0)

const initView = () => {
    let width = document.body.clientWidth
    let height = document.body.clientHeight
    let app = document.querySelector('#app') as HTMLElement

    if (width > height || width > 600) {
        let app_width = height / (812 / 375)
        app.style.width = app_width + 'px'
        vw_px.value = app_width / 100 + 'px'
        is_pc.value = 1.22
    } else {
        app.style.width = document.body.clientWidth + 'px'
        vw_px.value = width / 100 + 'px'
        is_pc.value = 1.02
    }
    let isMobile = navigator.userAgent.toLowerCase().match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if (isMobile) {
        is_pc.value = 1
    }
}

initView()
window.addEventListener('resize', initView)

</script>

<template>
    <div class="page">
        <header class="head flexTC">
            <div>
                <span>{{$route.meta.title}}</span>
            </div>
            <div>
                <van-switch class="change-theme" v-model="isDark" size="20" active-color="#f1f1f1" inactive-color="#333333" />
            </div>
        </header>
        <RouterView class="main" :style="{'--vw_px': vw_px, '--pc': is_pc}" />
    </div>
</template>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100%;
}
.head {
    height: 44px;
    padding: 0 16px;
    justify-content: space-between;
    box-shadow: 0 4px 10px 0 #00000080;
    transition: all .3s;
}
.main {
    height: calc(100% - 44px);
}
</style>
