import { httpInstance } from '@/apis';
import router from '@/router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
export interface Userinfo {
    avater: string,
    email: string,
    gender: number,
    integration: number,
    nickname: string,
    phoneNumber: string,
    username: string
}
export const useUserInfoStore = defineStore('userinfo-store',()=>{
    // 用户信息数据类型
    const userinfo = ref<Userinfo>()

    // 进行token本地保存
    const setAuth = (token:string)=>{
        httpInstance.defaults.headers.common.Authorization=token
        localStorage.setItem('token',token)
    }
    // 判断用户是否登录
    const authFormLocal = ()=>{
        const token = localStorage.getItem('token')
        if(token){
            setAuth(token)
            return true
        }
        return false
    }
    // 清除token并强制跳转到登陆页面
    const removeAuth = ()=>{
        delete httpInstance.defaults.headers.common.Authorization
        localStorage.removeItem('token')
        router.push('/login')
    }
    return{
        setAuth,authFormLocal,removeAuth,userinfo
    }
})