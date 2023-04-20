import request from '@/utils/request';
import { Book } from './types';

/**
 * 获取书本列表
 * @param pageNum 当前页码
 * @param pageSize 页面数据数目
 * @returns ResponsePromise
 */
export async function getBookList(pageNum:number,pageSize:number):ResponsePromise<PageInfo<Book>> {
    return await request({
        url: '/book/get_book_list',
        method: 'GET',
        params:{
            pageNum,
            pageSize
        }
    })
}