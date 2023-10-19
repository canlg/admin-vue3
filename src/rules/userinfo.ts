import { FormRules } from "element-plus"

export const rules:FormRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名的长度为3-10个字符', trigger: 'blur' },
      ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 15, message: '密码的格式不正确', trigger: 'blur' },
      ],
      nicknName:[
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名的长度为3-10个字符', trigger: 'blur' },
      ],
      phoneNumber:[ 
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {pattern:/^1[3-9]\d{9}$/,message:'手机号格式错误',trigger:'blur'}
      ]
}

