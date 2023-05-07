<template>
    <!-- 侧边栏菜单 -->
    <el-menu 
    :default-active="selectedPath"
    :router = "true"
    id="menu-container">
        
        <!-- 子菜单 -->
        <el-sub-menu 
        :index="item.itemName"
        v-for="(item,index) in menuItems">

            <!-- 子菜单icon -->
            <template #title>
                    <!-- 添加icon -->
                    <el-icon>
                        <Avatar v-if="item.id === MenuID.UserManage" />
                        <Notebook v-if="item.id === MenuID.BookManage" />
                        <Ticket v-if="item.id === MenuID.Announcement" />
                        <Tickets v-if="item.id === MenuID.OrderManage" />
                        <Operation v-if="item.id === MenuID.MachineManage" />
                    </el-icon>
                <span> {{item.itemName}} </span>
            </template>

            <!-- 子菜单子项 -->
            <el-menu-item-group>
                <!-- 具体功能 -->
                <el-menu-item 
                v-for="(innerItem) in item.children" 
                :index="innerItem.path">
                    {{innerItem.itemName}}
                </el-menu-item>
            </el-menu-item-group>

        </el-sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { getMenuListByAuthority } from '@/api/aside';
import { MenuItem,MenuID } from '@/api/aside/types';
import useStore from '@/store';
import router from '@/router';
import {
  Avatar,
  Notebook,
  Tickets,
  Operation,
  Ticket
} from '@element-plus/icons-vue'

// pinia
const sysMenuStore = useStore().sysMenu;

/** 获取并渲染菜单列表 */
let menuItems = ref<MenuItem[]>();
onMounted(async()=>{
    const { menuList } = storeToRefs(sysMenuStore);
    
    // 优先读取pinia缓存
    if(menuList.value.length !== 0) {
        menuItems.value = menuList.value;
    } else {
        // 未命中缓存，则获取菜单
        const list = (await getMenuListByAuthority()).data.data;
        menuItems.value = list;
        menuList.value = list;
    }
    
});

/** 监听路由改变，记住当前选中菜单项 */
const { selectedPath } = storeToRefs(sysMenuStore);
const routerToWatch = ref(router.currentRoute)

watch(routerToWatch,() => {
    selectedPath.value = routerToWatch.value.path;
})

</script>

<style lang="less" scoped>
#menu-container {
    height: 100%;
    position: relative;
    user-select: none;
    
}
</style>