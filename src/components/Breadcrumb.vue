<template>
    <div id="breadcrumb-container">
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{path:'/'}">主页</el-breadcrumb-item>
            <el-breadcrumb-item>{{breadRoute}}</el-breadcrumb-item>
        </el-breadcrumb>  

        <!-- 分割线 -->
        <el-divider content-position="right">
            <div id="description">
                RollBook
            </div>
        </el-divider>
    </div>
    
     
    
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
defineProps<{
 breadRoute?:string
}>()

</script>

<style lang="less" scoped>
#breadcrumb-container {
    height: 65px;

    #description{
        user-select: none;
        color: rgba(169, 169, 169, 0.432);
        font-style:oblique;
    }
}

</style>