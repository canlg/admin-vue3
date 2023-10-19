import { $http } from ".";

// 获取用户列表
export const getUserListApi = (params:{pageSize:number,requestPage:number})=>{
    return $http({
        method:'GET',
        url:'/admin/user/listWithPage',
        params,
    })
}

// 修改用户信息
export const updateUserApi = (
    id:number,
    data : {nicknName: string,
    phoneNumber: string})=>{
    return $http({
        method:'PUT',
        url:`/admin/user/${id}`,
        data
    })
}

