import request from '@/utils/request';
import { MenuItem } from './types';

/**
 * 根据个人权限获取菜单
 * @returns ResponsePromise
 */
export async function getMenuListByAuthority():ResponsePromise<MenuItem[]> {
    return await request({
        url:'/sys/get_menu_list',
        method: 'GET'
    })
}