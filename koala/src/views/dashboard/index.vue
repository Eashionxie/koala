<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goto = (name: string) => {
    router.push({ name })
}

</script>

<template>
    <div>
        <div class="entrance flexCC">
            <button @click="goto('yima')">姨妈助手</button>
            <button @click="goto('live')">直播演示</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.entrance {
    width: 100%;
    height: 60%;
    padding: 0 20px;
    flex-direction: column;
}
</style>