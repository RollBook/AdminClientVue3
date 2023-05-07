import request from '@/utils/request';
import { Book } from './types';

/**
 * 
 * @param pageNum 页码
 * @param pageSize 页面大小
 * @param order 排序方式(asc,desc)
 * @param order_prop 排序属性
 * @returns ResponsePromise
 */
export async function getBookList(pageNum:number, pageSize:number,
    order?:string, order_prop?:string):ResponsePromise<PageInfo<Book>> {

    return await request({
        url: "/book/get_book_list",
        method: "GET",
        params:{
            pageNum,
            pageSize,
            order,
            order_prop
        }
    });
}

export async function getBookByName(bookName:string, pageNum:number, pageSize:number,
    order?:string, order_prop?:string):ResponsePromise<PageInfo<Book>> {
    
        return await request({
            url: "/book/get_book_by_name",
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