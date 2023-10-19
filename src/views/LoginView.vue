<template>
    <section>
    <img src="../assets/img/bg.jpg" class="bg">
    <img src="../assets/img/trees.png" class="trees">
    <img src="../assets/img/girl.png" class="girl
    ">
    <div class="login">
        <h2>Sign In</h2>
        <!-- 绑定表单校验 -->
        <el-form ref="formRef" :model="form" :rules="rules">
            <el-form-item prop="username">
                <el-input class="input" v-model="form.username" :prefix-icon="User" placeholder="Username"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" show-password class="input" v-model="form.password" :prefix-icon="Lock" placeholder="Password"/>
            </el-form-item>
            <div class="btns">
            <el-button @click="btn" class="btn" type="primary" round>登录</el-button>
            </div>
        </el-form>
    </div>
    </section>
</template>

<script setup lang="ts">
import  {User ,Lock} from '@element-plus/icons-vue'
import { ElMessage, FormInstance } from 'element-plus';
import { ref} from 'vue'
import {rules} from '@/rules/userinfo'
import { loginApi } from '@/apis/login';
import {useUserInfoStore} from '@/stores/userinfo.store'
import router from '@/router';
const userInfoStore = useUserInfoStore()
// 定义表单类型
interface Form{
    username : string
    password: string
}
const form = ref<Form>({
    username:'admin',
    password:'admin'
})
// 表单校验
const formRef = ref<FormInstance>()

// 发起登录请求
const login = async ()=>{
    const res = await loginApi(form.value)
    // console.log(res);
    userInfoStore.setAuth(res.data.token)
    ElMessage.success('登录成功')
    router.push('/home/admin-home')
    
}
const btn = ()=>{
    login()
}
</script>
<style lang="scss" scoped>
.login {
    position: relative;
    padding: 60px;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(15px);
    border: 1px solid #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    border-right: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 20px;
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
    h2 {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 2.5em;
    font-weight: 600;
    color: #8f2c24;
    margin-bottom: 10px;
       }
       .el-form{
        width: 80%;
        .input{
            height: 40px;
            margin-top: 30px;
            :deep(.el-input__wrapper){
                border-radius: 20px;
            }
        }
        .btns{
            display: flex;
            justify-content: center;
            align-items: center;
            .btn{
                width: 150px;
                height: 40px;
                margin-top: 30px 
            }
        }
       }

}
@import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

section {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
}

section .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

section .trees {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 100;
    pointer-events: none;
}

section .girl {
    position: absolute;
    scale: 0.65;
    animation: animateGirl 10s linear infinite;
    pointer-events: none;
}

@keyframes animateGirl {
    0% {
        transform: translateX(calc(100% + 100vw));
    }
    50% {
        transform: translateX(calc(-100% - 100vw));
    }
    50.01% {
        transform: translateX(calc(-100% - 100vw)) rotateY(180deg);
    }
    100% {
        transform: translateX(calc(100% + 100vw)) rotateY(180deg);
    }
}





</style>
