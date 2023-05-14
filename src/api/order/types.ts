export interface Order{
    orderId:string
    createdTime:string
    buyerId:string
    sellerId:string
    audit:number
    bookId:string
    Book:Book
}
interface Book {
    bookId      : string // 书本id
    openid      : string // openid
    bookName    : string // 书本名称
    price       : number // 书本价格
    pressId     : number // 出版社id
    status      : number // 书本状态
    audit       : number // 书本审核状态
    tagId       : number // 标签id
    url1        : string // 封面url
    url2        : string // 背面url
    url3        : string // 扉页url
    description : string // 书本描述
    timestamp   : string // 13位时间戳
}