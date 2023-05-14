import request from '@/utils/request';
import { Announcement,Event } from "@/api/announcement/types";

/**
 * 
 * @param pageNum 页码
 * @param pageSize 页面大小
 * @returns ResponsePromise
 */
export async function getAnnouncementList(pageNum:number, pageSize:number):ResponsePromise<PageInfo<Announcement>> {

    return await request({
        url: "/announcement/get_announcement_list",
        method: "GET",
        params:{
            pageNum,
            pageSize
        }
    });
}


export async function getAnnouncementByLocation(location:string, pageNum:number, pageSize:number):ResponsePromise<PageInfo<Announcement>> {
    
        return await request({
            url: "/announcement/get_announcement_by_location",
            method: "GET",
            params:{
                location,
                pageNum,
                pageSize
            }
        })
}

export async function reviseAnnouncement(announcement:Announcement):ResponsePromise<number> {

    return await request({
        url: "/announcement/update_announcement",
        method: "POST",
        data:{
            location:announcement.location,
            value:announcement.value
        }
    })
}


export async function getEventList(pageNum:number, pageSize:number):ResponsePromise<PageInfo<Event>> {

    return await request({
        url: "/announcement/get_event_list",
        method: "GET",
        params:{
            pageNum,
            pageSize
        }
    });
}

