<template>
 <div class="wrap">
    <AdminOrerview class="item"></AdminOrerview>
    <PieChart class="item"></PieChart>

    <BarChar class="item"></BarChar>
    <LineChart class="item"></LineChart>
 </div>

</template>

<script setup lang="ts">
import AdminOrerview from '@/components/home/adminHome/AdminOrerview.vue'
import BarChar from '@/components/home/adminHome/BarChar.vue'
import LineChart from '@/components/home/adminHome/LineChart.vue'
import PieChart from '@/components/home/adminHome/PieChart.vue'
</script>

<style scoped lang="scss">
.wrap{
    display: flex;
    flex-wrap: wrap;
    box-shadow: var(--el-box-shadow-light);
    .item{
        width: 50%;
        // calc计算  //因为图表有4个 两个一行
        height: calc((100vh - 100px) / 2);
        min-height: 360px;
        padding: 20px;
        border: 1px solid #f5f5f5;
    }
}
</style>
