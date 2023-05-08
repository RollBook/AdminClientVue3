<template>
    <div id="header-container">
        <el-image 
        fit="fill" 
        class="logo" 
        @click="backHome"
        :src="avatar" />
        <el-button class="logoutButton" @click.once="logoutSys">退出登录</el-button>
    </div>

</template>

<script setup lang="ts">
import avatar from '@/assets/ROBOK.jpg';
import router from '@/router';
import {logoutSystem} from '@/api/login';
import { ElMessage } from 'element-plus';

// 点击左上角logo返回主页
function backHome() {
    router.push('/');
}

async function logoutSys(){
    const ret = await logoutSystem();
    if (ret.status === 200) {
        router.push('/login');
        ElMessage({
            message: `退出成功`,
             type: 'success'
        });
    }  
}

</script>

<style lang="less" scoped>
#header-container { 
    position: relative;
    height: 100%;

    .logo {
        position: absolute;
        cursor: pointer;
        left: 15px;
        top: 50%;
        transform: translate(0,-50%);
        height: 70%;
        
    } 

    .logoutButton{
        position: absolute;
        left: 70px;
        top: 50%;
        transform: translate(0,-50%);
    }
    
}
</style>