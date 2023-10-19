<template>
    <v-chart class="chart" :option="option" autoresize />
  </template>
  
  <script setup lang="ts">
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { BarChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
  } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { ref } from 'vue';
  import { getAchievementApi } from '@/apis/chats'
  
  use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
  ]);
//   定义数据类型
interface DataItem {
    shoeName:string
    num:number
    percentage:number
}

const data = ref<DataItem[]>([])

//   发起请求获取数据
  const getAchievement = async () =>{
    const res = await getAchievementApi()
    data.value = res.data  
    
    option.value.xAxis.data = data.value.map((item)=> item.shoeName)
    option.value.series[0].data = data.value.map((item)=> item.num)
}
getAchievement()
const option = ref({
    title: {
      text: '业绩报表',
      left: 'center',
    },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
});
  </script>
  
  <style scoped>
 
  </style>