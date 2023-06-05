export namespace InventoryInfo {
  export interface ResInventoryInfoItem {
    areaId: number | null
    cityId: number | null
    consignee: string
    consigneeTel: string
    createId: number | null
    createName: string | null
    createTime: string
    deliveryAddress: string
    id: string
    orderComment: string
    orderNo: string
    outOrderItemList: null
    outOrderNo: string
    parentOrderNo: null
    provinceId: number
    status: string
    statusName: string
    trackingCompany: null
    trackingNo: null
    updateId: number | null
    updateName: string | null
    updateTime: string
    warehouseId: number
    warehouseName: string
  }
}
