<script setup lang="ts">
import { ref } from 'vue';
import circleDate from "./components/circle.vue";
const lastRecord = {
    blood_volume: 0,
    create_time: 1658126161,
    duration_days: 62,
    id: 596,
    last_period_at: "2022-07-17",
    lover_id: 533308,
    pain_level: 0,
    status: 1,
    update_time: 1663341330,
    user_id: 1270506
}

const propData = ref({
    last_period_at: '2022-07-17'
})

const updateData = (key: any, val: any) => {
    // @ts-ignore
    propData.value[key] = val
}

</script>
    
<template>
    <circle-date
        :duration.sync="7"
        :cycle.sync="27"
        :last_period_at.sync="propData.last_period_at"
        :absolute_last="'2022-07-17'"
        :absolute_duration="7"
        :lastRecord="lastRecord"
        @updateData="updateData"
    ></circle-date>
</template>
    
<style lang="scss" scoped>
.full {
    width: 100%;
    height: 100vh;
}
</style>