import { defineStore } from 'pinia';

export default defineStore('sysUser', {
    state: () => {
        return {
            sysUserName: '',// 用户名
            token:''
        }
    },
    persist:true
})