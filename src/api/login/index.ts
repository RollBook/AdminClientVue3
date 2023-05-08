import request from '@/utils/request';
import type { LoginForm } from './types';

/**
 * 系统用户登录
 * @param form 登录表单数据
 * @returns ResponsePromise
 */
export async function sysUserLogin(form:LoginForm):ResponsePromise<string> {

    return await request({
        url: '/sys/login',
        method: 'POST',
        data:form
    });
}

/**
 * 检查用户登录状态
 * @returns ResponsePromise
 */
export async function checkPageAuth(route:string):ResponsePromise<null> {
    
    return await request({
        url: '/sys/check/page_auth',
        method: 'GET',
        params:{
            url:route
        }
    });
}


export async function logoutSystem():ResponsePromise<string> {
    return await request({
        url: 'sys/logout',
        method: 'GET'
    })
}