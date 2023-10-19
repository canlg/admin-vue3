import router from "@/router";
import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from 'axios'
import { ElMessage,ElLoading } from "element-plus";
export const httpInstance = axios.create()

export type BkResponse = {
    data: any;
    code: number;
    message: string;
    succeed: true;
}

// 设置请求跟路径
httpInstance.defaults.baseURL = import.meta.env.VITE_BASEURL

// 响应拦截器
export const $http = async (config: AxiosRequestConfig) => {
    const loadingInstance =  ElLoading.service()
    try {
        const axiosResponse = await httpInstance<BkResponse>(config)
        const bkResponse = axiosResponse.data
        if (!bkResponse?.succeed) {
            let errTilte: string = 'Error'
            if (bkResponse.code === 401) {
                errTilte = '未经授权'
                ElMessage.error('未授权')
                //跳转到登陆页面
                router.push('/login')
            }else if (bkResponse.code === 400) {
                errTilte = '禁止访问' 
                ElMessage.error(bkResponse.message)
            }
             else if (bkResponse.code === 403) {
                errTilte = '禁止访问'
            } else if (bkResponse.code === 9999) {
                errTilte = 'Error'
            } else if (bkResponse.code === 500) {
                errTilte = '服务器出错'
            } else {
                errTilte = '未知情况'
            }
            const err = new Error(bkResponse?.message || '未知错误')
            err.name = errTilte
        }
        return bkResponse
    } catch (err) {
        if (err instanceof AxiosError) {
            ElMessage.error('网络错误')
        }
        throw err
    }finally{
        loadingInstance.close()
    }
}