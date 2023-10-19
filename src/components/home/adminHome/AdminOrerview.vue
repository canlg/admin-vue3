<template>
    <div id="overview">
       <div class="userinfo">
        <el-avatar
            :src="userInfoStore.userinfo?.avater"/>
        <span class="username">{{userInfoStore.userinfo?.nickname}}</span>
        </div> 
        <div class="overview-list">
            <div class="overview-item" v-for="item in overviewData.allData" :key="item.id">
                <div class="title">{{item.name}}</div>
                <div class="number">{{item.number}}</div>
            </div>
            
        </div>
        <div class="overview-list">
            <div class="overview-item" v-for="item in overviewData.orderData" :key="item.id">
                <div class="title">{{item.name}}</div>
                <div class="number">{{item.number}}</div>
            </div>
            
        </div>
    </div>
   
</template>
   
<script setup lang="ts">
import { useUserInfoStore } from '@/stores/userinfo.store';
import { ref } from 'vue'

const userInfoStore = useUserInfoStore()
interface SingleData {
id:number
name:string
number:string
}
interface OverviewData{
allData:SingleData[]
orderData:SingleData[]
}
const overviewData = ref<OverviewData>({
allData: [
{
id: 1,
name: '总销售额',
number: '876.546'
},
{
id: 2,
name: '总访问量',
number: '876.546'
},
{
id: 3,
name: '总支付量',
number: '876.546'
},
{
id: 4,
name: '总收藏量',
number: '876.546'
},
],
orderData: [
    {
        id:1,
        name:'今日订单',
        number:'254'
    },
    {
        id:2,
        name:'积累金额',
        number:'254'
    },
    {
        id:3,
        name:'本月订单',
        number:'154'
    },
    {
        id:4,
        name:'积累金额',
        number:'11123254'
    },
]
})
</script>

<style scoped lang="scss">
#overview{
    .userinfo{
        display:flex;
        align-items:center;
        .username{
            margin-left: 10px;
            
        }
    }
    .overview-list{
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        .overview-item{
            width: 22%;
            display: flex;
            // 纵向排列
            flex-direction: column;
            // 水平居中
            align-items: center;
            // 垂直居中
            justify-content: center;
            box-shadow: var(--el-box-shadow-light);
            border-radius: 10px;
            padding: 20px;
            .title{
                font-size: 600;
                margin-bottom: 10px;

            }
            .number{
                font-size: 18px;
            }
        }
    }
}
</style>
