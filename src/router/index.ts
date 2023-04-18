import path from 'path';
import { storeToRefs } from 'pinia';
import useStore from '@/store/index';
import { ElMessageBox } from 'element-plus';
import { checkLogin } from '@/api/login';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path:  '/',
        redirect: '/homepage'
    },

    {
        path:   '/login',
        component:  ()=>import('@/views/Login.vue')
    },
    
    {
        path: '/home',
        component: ()=>import('@/views/Home.vue'),
        children:[
            {
                path:  '/homepage',
                component: ()=>import('@/views/HomePage.vue')
            }
                ]
    },
]

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes as RouteRecordRaw[],
});

// 路由守卫，登录拦截
router.beforeEach(async(to, from, next) => {
    // pinia
    const sysUserStore = useStore().sysUser;

    // 判断是否去登录页
    if (to.path === '/login') {
        next();
    } else {
        
        const { token } = storeToRefs(sysUserStore);
        // 判断是否第一次登录
        if (!token || token.value.trim() === '') {
            router.push('/login');
        } else {
            // token存在,校验token
            
            // 如果token已经过期,封装的request API会检测到401状态码，自动返回登录页面
            const ret = await checkLogin();
            if(ret.status === 401) {
                return;
            }

            // token未过期
            next();
        }
    }

});

export default router;