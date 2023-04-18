import request from '@/utils/request';
import type { LoginForm } from './types';
import type { AxiosPromise } from 'axios';

/** 用户登录 */
export async function sysUserLogin(form:LoginForm):AxiosPromise<ResRecord<string>> {
    return await request({
        url: '/sys/login',
        method: 'POST',
        data:form
    });
}

/** 检查用户登录状态 */
export async function checkLogin():AxiosPromise<ResRecord<null>> {
    
    return await request({
        url: '/sys/check_login',
        method: 'GET'
    });
}