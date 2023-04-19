import { MenuItem } from '@/api/aside/types';
import { defineStore } from 'pinia';

export default defineStore('sysMenu', {
    state: () => {
        return {
            selectedPath:'',            // 当前选中路径
            menuList:[] as MenuItem[]   // 菜单列表
        };
    },
    persist:true
})