<template>
 <div id="users">
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
    <div class="header">
        <el-input
        v-model="keyword"
      class="input"
      size="large"
      placeholder="请输入关键词"
        clearable
    >
    <template #append>
        <el-button :icon="Search" @click="handleSearch"></el-button>
    </template>
    </el-input>
    </div>
    <el-table :data="seacrhRes.length?seacrhRes:tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="55px"></el-table-column>
    <el-table-column prop="username" label="username" ></el-table-column>
    <el-table-column prop="nickname" label="昵称" ></el-table-column>
    <el-table-column prop="email" label="邮箱" ></el-table-column>
    <el-table-column prop="phoneNumber" label="手机号" ></el-table-column>
    <el-table-column prop="gender" label="性别" >
        <template #default="scope">
        <div style="display: flex; align-items: center">
            <span>{{scope.row.gender === 0 ?'女':'男'}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="头像">
      <template #default="scope">
        <div style="display: flex; align-items: center">
            <el-avatar :src="scope.row.avater"></el-avatar>
        </div>
      </template>
    </el-table-column>
    
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="openEditFormDialog(scope.row)"
          >编辑</el-button
        >
        
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      v-model:current-page="query.requestPage"
      v-model:page-size="query.pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="sizes, prev, pager, next"
      :total="total"
      @size-change="getUserlist"
      @current-change="getUserlist"
    />

</el-card>
<el-dialog v-model="dialogFormVisible" title="编辑用户信息" width="500px" style="border-radius: 20px;">
    <el-form ref="editFormRed" :model="editForm" :rules="rules">
      <el-form-item label="昵称" prop="nicknName">
        <el-input v-model="editForm.nicknName" autocomplete="off"  />
      </el-form-item>
      <el-form-item label="手机" prop="phoneNumber">
        <el-input v-model="editForm.phoneNumber" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返回</el-button>
        <el-button type="primary" @click="handleEdit">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
 </div>

</template>

<script setup lang="ts">
import { getUserListApi ,updateUserApi} from '@/apis/users';
import {ArrowRight,Search} from '@element-plus/icons-vue'
import { ElMessage, FormInstance } from 'element-plus';
import { ref } from 'vue';
import {rules} from '@/rules/userinfo'
const keyword = ref<string>()

// 检验规则
const editFormRed = ref<FormInstance>()

// 响应式容器
const query = ref({
    pageSize:5,
    requestPage:1
})

const total = ref<number>(0)

interface User {
     avater :  string ,
        createTime :  Date ,
        email :  string ,
        gender : number,
        id : number,
        integration : number,
        isDeleted : 0 | 1,
        nickname :  string ,
        password :  string ,
        phoneNumber :  string ,
        status : 0 | 1,
        updateTime :  Date ,
        username :  string 
}
// 数据容器
const tableData=ref<User[]>([])
const getUserlist = async ()=>{
    await editFormRed.value?.validate()
    const res = await getUserListApi(query.value)
    console.log(res);
    tableData.value=res.data.records
    total.value= res.data.totalElements
}

const seacrhRes = ref<User[]>([])
// 搜索功能
const handleSearch = ()=>{
    seacrhRes.value = tableData.value.filter((user)=>
        user.username.toLocaleLowerCase().indexOf(keyword.value?.toLocaleLowerCase()) != -1
    )
}

// 控制编辑对话框的显示于隐藏
const dialogFormVisible = ref<boolean>(false)

interface EditForm {
  nicknName: string,
  phoneNumber: string
}
// 编辑用户的表单
const editForm = ref<EditForm>({
  nicknName:'',
  phoneNumber:''
})
// 点击修改用户的id
const editUserid = ref(-1)

// 打开编辑对话框,并获取当前用户的信息 回显
const openEditFormDialog = ( row: User) => {
  dialogFormVisible.value=true
  editForm.value.nicknName = row.nickname
  editForm.value.phoneNumber = row.phoneNumber
  editUserid.value = row.id
  console.log(editForm.value);
  
}
// 修改成功后提交
// #中文
const handleEdit = async ()=>{
   await updateUserApi( editUserid.value ,editForm.value )
   ElMessage.success('修改成功')
   dialogFormVisible.value = false
   getUserlist()
  }


getUserlist()

</script >   

<style scoped lang="scss">
#users{
    .el-breadcrumb{
        margin-bottom: 20px ;
    }
    .header{
        .input{
            width: 40%;
        }
    }
    .el-pagination{
        margin-top: 30px;
        display: flex;
        // 水平居中
        justify-content: center;
    }
}
</style>
