import {request} from "@/network/request";

export function getDetail(iid) {
  return request({
    url:'/detail',
    params: {
      iid
    }
  })
}

export class Goods{
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.newPrice
    this.oldPrice = itemInfo.oldPrice
    this.disCount = itemInfo.disCountDesc
    this.columns = columns
    this.services = services
    this.readPrice = itemInfo.lowNowPrice
  }
}
