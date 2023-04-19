import { storeToRefs } from 'pinia';
import useStore from '@/store';
import { checkPageAuth } from '@/api/login';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { ElMessage } from 'element-plus';

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
            },

            /** 用户管理 */
            {
                path:   '/user/list',
                component: ()=>import('@/views/user/UserList.vue')
            },

            {
                path:   '/user/feedback',
                component: ()=>import('@/views/user/UserFeedback.vue')
            },

            {
                path:   '/inform/customer_service',
                component:  ()=>import('@/views/user/InformCustomerService.vue')
            },

            {
                path:   '/customer_service/list',
                component:  ()=>import('@/views/user/CustomerServiceList.vue')
            },

            {
                path:   '/general/user_manage',
                component:  ()=>import('@/views/user/GeneralUserManage.vue')
            },

            /** 书本管理 */
            {
                path:   '/book/list',
                component:  ()=>import('@/views/book/BookList.vue')
            },

            {
                path:   '/book/check',
                component:  ()=>import('@/views/book/BookCheck.vue')
            },

            {
                path:   '/book/recycle_bin',
                component:  ()=>import('@/views/book/BookRecycleBin.vue')
            },

            {
                path:   '/general/book_manage',
                component:  ()=>import('@/views/book/GeneralBookManage.vue')
            },

            /** 订单管理 */
            {
                path:   '/order/list',
                component:  ()=>import('@/views/order/OrderList.vue')
            },

            {
                path:   '/order/recycle_bin',
                component:  ()=>import('@/views/order/OrderRecycleBin.vue')
            },

            {
                path:   '/general/order_manage',
                component:  ()=>import('@/views/order/GeneralOrderList.vue')
            },

            /** 机器管理 */
            {
                path:   '/machine/list',
                component:  import('@/views/machine/MachineList.vue')
            },

            {
                path:   '/general/machine_manage',
                component:  import('@/views/machine/GeneralMachineManage.vue')
            },

            /** 公告管理 */
            {
                path:   '/announcement/list',
                component:  import('@/views/announcement/AnnouncementList.vue')
            },

            {
                path:   '/event/list',
                component:  import('@/views/announcement/EventList.vue')
            }
                ]
    },

]

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes as RouteRecordRaw[],
});

/** 页面路径白名单 */
const whiteList:string[] = 
['/login','/home','/homepage']

// 路由守卫，登录拦截白名单以外路由
router.beforeEach(async(to, from, next) => {
    // pinia
    const sysUserStore = useStore().sysUser;

    // 判断是否去登录页
    if (whiteList.includes(to.path)) {
        next();
    } else {
        
        const { token } = storeToRefs(sysUserStore);
        // 判断是否第一次登录
        if (!token || token.value.trim() === '') {
            next({ path:'/login' });
            
        } else {
            // token存在,校验token

            // 如果存在的token已经过期,封装的request API会检测到401状态码，自动返回登录页面
            
            const ret = await checkPageAuth(to.path);
            
            // 403 说明权限不足
            if(ret.status === 403) {
                ElMessage({
                    message:ret.data.msg,
                    type:"error"
                });
                next({ path:from.fullPath });  
            // 401 说明尚未认证身份          
            } else if(ret.status === 401) {
                next({ path:'/login' }); 
            // 否则直接放行
            } else {
                next();
            }

        }
    }

});

export default router;