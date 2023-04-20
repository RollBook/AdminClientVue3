import request from '@/utils/request';
import { list } from './types';

export async function getListByType(listType: list,pageNum:number,
    pageSize:number):ResponsePromise<PageInfo<Object>> {
    return await request({
        url: `/${listType}/get_book_list`,
        method: 'GET',
        params:{
            pageNum,
            pageSize
        }
    })
}