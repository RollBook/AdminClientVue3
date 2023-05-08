import request from '@/utils/request';
import { User } from "./types";

/**
 * 
 * @param pageNum 页码
 * @param pageSize 页面大小
 * @param order 排序方式(asc,desc)
 * @param order_prop 排序属性
 * @returns ResponsePromise
 */
export async function getUserList(pageNum:number, pageSize:number,
    order?:string, order_prop?:string):ResponsePromise<PageInfo<User>> {

    return await request({
        url: "/user/get_user_list",
        method: "GET",
        params:{
            pageNum,
            pageSize,
            order,
            order_prop
        }
    });
}

export async function getUserListByName(nickName:string, pageNum:number, pageSize:number,
    order?:string, order_prop?:string):ResponsePromise<PageInfo<User>> {
    
        return await request({
            url: "/user/get_user_by_name",
            method: "GET",
            params:{
                nickName,
                pageNum,
                pageSize,
                order,
                order_prop
            }
        })
}