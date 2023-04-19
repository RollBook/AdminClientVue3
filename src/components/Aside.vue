<template>
    <el-menu id='menu-container'>
        <el-sub-menu v-for="(item,index) in menuItems">
            <!-- 子菜单icon -->
            <template #title>
                    <el-icon>
                    <!-- TODO: 添加icon -->
                    </el-icon>
                <span>{{item.itemName}}</span>
            </template>

            <!-- 子菜单子项 -->
            <el-menu-item-group>
                <!-- 具体功能 -->
                <el-menu-item v-for="(innerItem) in item.children" :index="innerItem.path">
                    {{innerItem.itemName}}
                </el-menu-item>
            </el-menu-item-group>
            
        </el-sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getMenuListByAuthority } from '@/api/aside';
import type { MenuItem } from '@/api/aside/types';

let menuItems = ref<MenuItem[]>()
onMounted(async()=>{
    menuItems.value = (await getMenuListByAuthority()).data.data
})

</script>

<style lang="less" scoped>
#menu-container {
    height: 100%;
}
</style>