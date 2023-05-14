import request from '@/utils/request';
import {Order} from './types'


export async function getOrderList(pageNum:number, pageSize:number,
    order?:string, order_prop?:string):ResponsePromise<PageInfo<Order>> {

    return await request({
        url: "/order/get_order_list",
        method: "GET",
        params:{
            pageNum,
            pageSize,
            order,
            order_prop
        }
    });
}

export async function getOrderByName(bookName:string, pageNum:number, pageSize:number,
    order?:string, order_prop?:string):ResponsePromise<PageInfo<Order>> {
    
        return await request({
            url: "/order/get_order_by_name",
            method: "GET",
            params:{
                bookName,
                pageNum,
                pageSize,
                order,
                order_prop
            }
        })
}

export async function delOrder(orderId:string):ResponsePromise<number> {
    return await request({
        url: '/order/del_order?orderId='+encodeURIComponent(orderId),
        method: "POST"
    })
}

export async function getRecycleOrderList(pageNum:number, pageSize:number,
    order?:string, order_prop?:string):ResponsePromise<PageInfo<Order>> {

    return await request({
        url: "/order/get_recycle_order_list",
        method: "GET",
        params:{
            pageNum,
            pageSize,
            order,
            order_prop
        }
    });
}

export async function getRecycleOrderByName(bookName:string, pageNum:number, pageSize:number,
    order?:string, order_prop?:string):ResponsePromise<PageInfo<Order>> {
    
        return await request({
            url: "/order/get_recycle_order_by_name",
            method: "GET",
            params:{
                bookName,
                pageNum,
                pageSize,
                order,
                order_prop
            }
        })
}


export async function recycleOrder(orderId:string):ResponsePromise<number> {
    return await request({
        url: '/order/recycle_order?orderId='+encodeURIComponent(orderId),
        method: "POST"
    })
}