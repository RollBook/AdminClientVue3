<template>
    <!-- el布局容器 -->
    <el-container id='main-container'>

        <!-- 顶部导航栏 -->
        <el-header id="el-header">
            <Header />
        </el-header>


        <!-- el布局容器 -->
        <el-container>

            <!-- 侧边栏 -->
            <el-aside 
            width="260px" 
            id="el-aside">
                <Aside />
            </el-aside>

            <!-- 页面内容 -->
            <el-main>
                Main
            </el-main>

        </el-container>

        </el-container>
    <!-- </div> -->
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Aside from '@/components/Aside.vue';

</script>

<style lang="less" scoped>
#main-container {
    height: 100%;

    #el-header {
        height: 65px;
        background-color: @theme-color;
    }

    #el-aside {
        background-color: @theme-color2;
    }
}
</style>