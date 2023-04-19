/** 全局类型定义 */

/** 后端返回数据格式 */
declare interface ResRecord<T> {
    data    :T
    status  :number
    msg     :string
}

/** 封装后端响应promise */
declare type ResponsePromise<T> = 
    import('axios').AxiosPromise<ResRecord<T>>

