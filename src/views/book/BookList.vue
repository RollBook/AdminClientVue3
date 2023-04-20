<template>
    <div id="book-list-container">
        <Breadcrumb bread-route="书本列表" />

        <CustomTable 
        class="custom-table">
            <el-table-column prop="bookId" show-overflow-tooltip label="ID" />
            <el-table-column prop="openId" show-overflow-tooltip label="openID" />
            <el-table-column prop="bookName" show-overflow-tooltip label="书本名称" />
            <el-table-column prop="price" label="书本价格" />
            <el-table-column prop="pressId" label="出版社id" />
            <el-table-column prop="status" label="书本状态" />
            <el-table-column prop="audit" label="审核状态" />
            <el-table-column prop="tagId" label="标签ID" />
            <el-table-column prop="url1" show-overflow-tooltip label="封面URL" />
            <el-table-column prop="url2" show-overflow-tooltip label="背面URL" />
            <el-table-column prop="url3" show-overflow-tooltip label="扉页URL" />
            <el-table-column prop="description" show-overflow-tooltip label="书本描述" />
            <el-table-column prop="timestamp" show-overflow-tooltip label="时间戳" />
        </CustomTable>
    </div>
    

    
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CustomTable from '@/components/CustomTable.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import type { Book } from "@/api/book/types";
import router from '@/router';


</script>

<style lang="less">
#book-list-container {
    height: 100%;
    
    .custom-table {
        height: calc(100% - 65px);
    }
}
</style>