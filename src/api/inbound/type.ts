/*
 * @Description:入库类型
 * @Autor: codeBo
 * @Date: 2023-06-01 15:06:06
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-01 16:03:55
 */
export namespace InOrderInfo {
  export interface inOrderItem {
    id: number
    createId: number
    createName: string
    updateId: number
    updateName: string
    createTime: string
    updateTime: string
    param: Record<string, unknown>
    inOrderNo: string
    shipperOrderNo: string
    shipperId: number
    shipperName: string
    estimatedArrivalTime: string
    warehouseId: number
    driver: string
    driverPhone: string
    expectCount: number
    status: string
    inOrderItemList: string
    statusName: string
    warehouseName: string
  }
  export interface ReqPage {
    pageNum: number
    pageSize: number
    no: string
  }
  export interface Warehouse {
    id: number
    createId: number | null
    createName: string | null
    updateId: number
    updateName: string
    createTime: string
    updateTime: string
    param: Record<string, unknown>
    name: string
    type: number
    provinceId: number
    cityId: number
    areaId: number
    address: string
    builtArea: number
    manageId: number
    manageName: string
    managePhone: string
    storeareaCount: number
    storeshelfCount: number
    storehouseCount: number
    status: number
    provinceName: string | null
    cityName: string | null
    areaName: string | null
    distance: number | null
  }
}
