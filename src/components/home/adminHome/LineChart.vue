<template>
    <v-chart class="chart" :option="option" autoresize />
  </template>
  
  <script setup lang="ts">
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { LineChart  } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
  } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { ref } from 'vue';
  import { getOrderApi } from '@/apis/chats'
  
  use([
    CanvasRenderer,
    LineChart ,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
  ]);
//   定义数据类型
interface DataItem {
    date:string
    num:number
}

const data = ref<DataItem[]>([])

//   发起请求获取数据
  const getOrder = async () =>{
    const res = await getOrderApi()
    data.value = res.data  
    console.log(res);
    option.value.xAxis.data = data.value.map((item)=> item.date)
    option.value.series[0].data = data.value.map((item)=> item.num)
}
getOrder()
const option = ref({
    title: {
      text: '订单报表',
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
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }
  ]
});
  </script>
  
  <style scoped>
 
  </style>