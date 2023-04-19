<template>
    <!-- el布局容器 -->
    <el-container id='main-container'>

        <!-- 顶部导航栏 -->
        <el-header id="el-header">
            <Header />
        </el-header>


        <!-- el布局容器 -->
        <el-container id="inside-container">

            <!-- 侧边栏 -->
            <el-aside 
            width="260px" 
            id="el-aside">
                <Aside />
            </el-aside>

            <!-- 页面内容 -->
            <el-main>
                <router-view :key="1"/>
            </el-main>

        </el-container>

    </el-container>

</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Aside from '@/components/Aside.vue';

</script>

<style lang="less" scoped>
#main-container {
    height: 100%;
    display: flex;

    #el-header {
        height: 50px;
        background-color: @theme-color;
    }

    #inside-container {
        height: calc(100% - 50px);
        #el-aside {
            height: 100%;
            background-color: @theme-color2;
        }
    }

    
}
</style>