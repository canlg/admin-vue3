<template>
    <div id="home">
      <el-container>
        <el-header>
            <AdminHeader></AdminHeader>
        </el-header>
        <el-container>
            
                <el-aside width="200px">
                    <el-affix>
                    <AdminMenu></AdminMenu>

                    </el-affix>
                </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
<script setup lang="ts">
import AdminHeader from '@/components/layout/AdminHeader.vue';
import AdminMenu from '@/components/layout/AdminMenu.vue';
import { useUserInfoStore } from '@/stores/userinfo.store';
import {getUserinfoApi} from '@/apis/userinfo'

// 持久化存储
const userInfoStore = useUserInfoStore()

// 发起请求获取用户信息
const  getUserinfo = async ()=>{
    const res = await getUserinfoApi()
    userInfoStore.userinfo = res.data    
}
getUserinfo()
</script>

<style scoped lang="scss">
#home{
    // 最小高度  100vh是占满屏幕
    min-height: 100vh;
    .el-header{
        background-color: #2b2c43;
        padding: 0;
    }
    .el-aside{
        background-color: #2b2c43;
        min-height: calc(100vh - 60px);
    }
}
</style>
