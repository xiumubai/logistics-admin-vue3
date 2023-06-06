import type { ReqPage } from '../types'
export interface ReqInvLog extends ReqPage {
  goodsId: string
}
export namespace InventoryInfo {
  export type InventoryInfoItem = {
    availableCount: number
    createId: number
    createName: string
    createTime: string
    goodsId: number
    goodsInfo: null
    id: number
    lockCount: number
    pickingCount: number
    saleCount: number
    status: number
    storeareaId: number
    storehouseId: number
    storehouseName: string
    storeshelfId: number
    totalCount: number
    unitId: number
    updateId: number | null
    updateName: string | null
    updateTime: string
    warehouseId: number
    warehouseName: string
    warningCount: number
  }
  export interface ResInventoryInfoItem {
    barcode: string
    baseCount: number
    baseUnitId: number
    baseUnitName: string
    brandName: string
    code: string
    createId: number | null
    createName: string | null
    createTime: string
    goodsTypeId: number
    goodsTypeName: string
    id: number
    inspectTypeId: number
    inspectTypeName: string
    inventoryInfoList: InventoryInfoItem[]
    name: string
    saleAttr: string
    skuId: number
    status: number
    temperatureTypeId: number
    temperatureTypeName: string
    unitId: number
    unitName: string
    updateId: number
    updateName: string
    updateTime: string
    volume: string
    weight: string
  }
  export interface InventoryParams {
    count: string
    goodsId: number
    warehouseId: number
    warehouseName: string
  }
}

export namespace InvCounting {
  export interface ResInvCountingItem {
    createId: number
    createName: string
    createTime: string
    id: number
    invCountingItemList: null
    invCountingNo: string
    planCountingTime: string
    reasonId: number
    reasonName: string
    remarks: string
    status: string
    statusName: string
    storeareaId: number
    storehouseId: number
    storehouseName: string
    storeshelfId: number
    updateId: number | null
    updateName: string | null
    updateTime: string
    warehouseId: number
    warehouseName: string
  }
}

export namespace InvCountingTask {
  export interface ReqAssignParams {
    invCountingId: string
    countingUser: string
    countingUserId: string
  }
  export interface ResInvCountingTaskItem {
    countingCompleteTime: string | null
    countingUser: string
    countingUserId: number
    createId: number
    createName: string
    createTime: string
    id: number
    invCountingId: number
    invCountingNo: string
    remarks: string | null
    status: string
    statusName: string
    taskNo: string
    updateId: number | null
    updateName: string | null
    updateTime: string
    warehouseId: number
  }
}
