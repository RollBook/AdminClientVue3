<template>
    <div id="custom-table-container">
        <!-- 检索框 -->
        <div id="custom-input">
            
            <el-input  
             @keydown.native.enter="serachByParam"
             v-model="inputModel"
             placeholder=" 请输入关键词">
                <template #append>
                    <el-button :icon="Search" @click="serachByParam"/>
                </template>
            </el-input>
        </div>
        
        <!-- 表格 -->
        <el-table 
        id="el-table"
        @sort-change="changeSort"
        :data="renderPageInfo?.list" 
        :default-sort="defaultSort"
        border >
            <!-- 表格列插槽 -->
            <slot />
        </el-table>
        
        <!-- 数据分页 -->
        <el-pagination
        id="el-pagination"
        :total="total"
        v-model:current-page="currentPage"
        v-model:page-size="PageSize"
        layout="prev, pager, next, jumper"
        />
    </div>
    
</template>

<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue';
import type { ElTableColumn } from "element-plus";
import { Search } from '@element-plus/icons-vue'
import router from '@/router';

const props = defineProps<{
    defaultSort?: Object,
    defaultMethod: (pageNum:number,pageSize:number,order?:string,order_prop?:string)=>ResponsePromise<PageInfo>,
    searchMethod: (searchParam:string,pageNum:number,pageSize:number,order?:string,order_prop?:string)=>ResponsePromise<PageInfo>
    }>();

/** 1.检索功能封装 */
const inputModel = ref<string>();
async function serachByParam() {
    await router.push({
        path:currentRoute.value.path,
        query:{
            pageNum  :currentPage.value,
            pageSize :PageSize.value,
            ...inputModel.value?{ param:inputModel.value }:{}
        }
    });
    await getAndRender();
}

/** 2.表格功能封装 */
const total = ref<number>(Number(0));   // 数据总数
const currentPage = ref<number>(1);     // 当前页码
const PageSize = ref<number>(12);       // 当前页面数据数目

// 组件初始化时获取初始数据
const currentRoute = ref(router.currentRoute);
const renderPageInfo = ref<PageInfo>();

// 组件初始化时请求数据
onMounted(async()=>{ 
    const query = currentRoute.value.query; 
    const { pageNum } = query as any;

    if(Object.keys(query).length === 0) {
        let pageInfo:PageInfo;
        pageInfo = (await props.defaultMethod(1,12)).data.data;    
        renderPageInfo.value = pageInfo; 
        PageSize.value = pageInfo.pageSize;
        total.value = pageInfo.total;
    } else {
        currentPage.value = parseInt(pageNum);
        await getAndRender();
    }
    
});

// 监听 页码变化
watch(currentPage,async()=>{
    const query = currentRoute.value.query;
    const { order,order_prop,param } = query as any;

    await router.push({
        path:currentRoute.value.path,
        query:{ 
            pageNum:currentPage.value,
            pageSize:PageSize.value,
            order,
            order_prop,
            param
         }
    });
    await getAndRender();
    
});

/**
 * 列表排序
 * @param e 排序事件对象
 */
 async function changeSort(e:{ 
    column:InstanceType<typeof ElTableColumn>,
    prop:string, order:string }) {

    const query = currentRoute.value.query;
    const { param } = query as any;

    await router.push({
        path:currentRoute.value.path,
        query:{
            pageNum         :currentPage.value,
            pageSize        :PageSize.value,
            ...e.order ? { order:e.order==="ascending"?"asc":"desc" , order_prop:e.prop } : {},
            param:query.param
        }
    });
    await getAndRender();
}

/**
 * 请求数据并渲染列表
 */
async function getAndRender() {
    const query = currentRoute.value.query;
    const { pageNum,pageSize,order,order_prop,param } = query as any;
    
    // 判断是否存在查询参数，存在则为搜索模式
    const pageInfo:PageInfo = param?
        (await props.searchMethod(param,pageNum,pageSize,order,order_prop)).data.data
        :(await props.defaultMethod(pageNum,pageSize,order,order_prop)).data.data; 

    renderPageInfo.value = pageInfo; 
    PageSize.value = pageInfo.pageSize;
    total.value = pageInfo.total;
    
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