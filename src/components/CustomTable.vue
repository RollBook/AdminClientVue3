<template>
    <div id="custom-table-container">
        <!-- 检索框 -->
        <div id="custom-input">
            
            <el-input  v-model="inputModel" placeholder=" 请输入关键词">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
        
        <!-- 表格 -->
        <el-table 
        id="el-table"
        :data="data?.list" 
        :default-sort="defaultSort"
        border >
            <slot />
        </el-table>
        
        <!-- 数据分页 -->
        <el-pagination
        id="el-pagination"
        :total="total"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        layout="prev, pager, next, jumper"
        />
    </div>
    
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Search } from '@element-plus/icons-vue'
import router from '@/router';
import type { list } from '@/api/list/types';
import { getListByType } from '@/api/list';

const props = defineProps<{
    defaultSort?: Object
}>();

/** 检索功能封装 */
const inputModel = ref<string>();

/** 表格功能封装 */
const total = ref<number>(Number(0));   // 数据总数
const currentPage = ref<number>(1);     // 当前页码
const pageSize = ref<number>(12);        // 当前页面数据数目
const emit = defineEmits(['currentChange','handleSizeChange']);

// 组件初始化时获取初始数据
const currentRoute = ref(router.currentRoute);
const data = ref<PageInfo>();

// 组件初始化时请求数据
onMounted(async()=>{    
    
    await getAndRender(currentRoute.value.path.split('/')[1]);
})

// 监听页码变化
watch(currentPage,async()=>{
    router.push({
        path:currentRoute.value.path,
        query:{ pageNum:currentPage.value,pageSize:pageSize.value }
    })
    await getAndRender(currentRoute.value.path.split('/')[1]);
})

// 请求并渲染表格
async function getAndRender(type:string) {
    data.value = (await getListByType(type as list,
        currentPage.value,pageSize.value)).data.data;
    currentPage.value = Number(currentRoute.value.query.pageNum);
    pageSize.value = Number(currentRoute.value.query.pageSize);
    total.value = data.value.total;
}

</script>

<style lang="less">
#custom-table-container {
    height: 100%;

    #custom-input {
        height: 45px;
    }

    #el-table {
        height: calc(100% - 75px);
    }

    #el-pagination {
        height: 50px;
    }
}
</style>