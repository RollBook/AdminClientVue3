/**
 * 编码书本状态
 * @param statusArray 书本状态数组
 * @returns number
 */
export function bookEncode(statusArray:Array<8|4|2|1>) {
    let status = 0;
    statusArray.forEach(statusCode => status |= statusCode);
    return status;
}

/**
 * 解码书本状态
 * @param status 书本状态编码
 * @returns number[]
 */
export function bookDecode(status:number) {
    return [8,4,2,1]
    .map(statusCode => (status & statusCode))
    .filter(status => status !== 0);
}