<template>
    <div id="header-container">
        <el-image 
        fit="fill" 
        class="logo" 
        @click="backHome"
        :src="avatar" />
    </div>
    
</template>

<script setup lang="ts">
import avatar from '@/assets/ROBOK.jpg';
import router from '@/router';

// 点击左上角logo返回主页
function backHome() {
    router.push('/homepage');
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
    
}
</style>