import path from 'path';
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
    }
]

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes as RouteRecordRaw[],
  });

  export default router;