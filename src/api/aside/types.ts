/** 菜单枚举 */
export enum MenuID {
    /* 用户管理 */ UserManage=1,
    UserList=11,UserFeedback=12,
    CustomerServiceList=13,CustomerInform=14,GeneralUserManage=15,


    /* 书本管理 */ BookManage=2,
    BookList=21,BookCheck=22,
    BookRecycleBin=23,GeneralBookManage=24,


    /* 订单管理 */ OrderManage=3,
    OrderList=31,OrderRecycleBin=32,GeneralOrderManage=33,


    /* 机器管理 */ MachineManage=4,
    MachineList=41,GeneralMachineManage=42,


    /* 活动公告 */ Announcement=5,
    AnnouncementList=51,EventList=52
}

/** 菜单选项 */
export interface MenuItem {
    id      : MenuID,
    path    : string,
    itemName: string,
    children: MenuSubItem[]
}

/** 菜单子选项 */
export interface MenuSubItem {
    id      : MenuID,
    path    :string,
    itemName:string
}