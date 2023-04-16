<template>
    <div id="login-container">
        <el-card id="login-card">

            <!-- 登录表单 -->
            <el-form
            ref="ruleFormRef" 
            :model="loginForm"
            :rules="rules"
            label-position="top"
            status-icon
            label-width="120px">

                <el-form-item label="用户名" prop="name">
                    <el-input 
                    v-model="loginForm.name"
                    @keydown.native.enter="submit(ruleFormRef)" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input 
                    v-model="loginForm.password"
                    @keydown.native.enter="submit(ruleFormRef)" />
                </el-form-item>

                <el-button @click="submit(ruleFormRef)">
                    登录
                </el-button>

            </el-form>

        </el-card>
        

    </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue';
import { ElMessage,FormInstance,FormRules } from 'element-plus';

// 声明表单对象，定义验证规则
const ruleFormRef = ref<FormInstance>();
const loginForm = reactive({
  name: '',
  password: ''
})

const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名长度应为3到10的数', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度应为6到20的数', trigger: 'blur' }
    ]
})

// 提交表单
async function submit(formEl: FormInstance | undefined) {
    if (!formEl) return
    await formEl.validate(async function (valid, fields) {   
        if (valid) {
          
        
        } else {
            ElMessage({
                message: '请补全信息',
                type: 'error'
            })
        }
  })
    
}


</script>

<style lang='less' scoped>
#login-container {
    height: 100%;

    #login-card {
        text-align: center; 
	    border-radius: 20px;
        padding: 30px 10px;
	    width: 450px;   
	    position: absolute;
	    left: 50%;
	    top: 45%;
	    transform: translate(-50%,-50%);
    }
}
</style>