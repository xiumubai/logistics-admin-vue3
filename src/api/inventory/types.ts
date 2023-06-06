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
  export interface InvMoveItem {
    id: number
    createId: number
    createName: string
    updateId: number | null
    updateName: string | null
    createTime: string
    updateTime: string
    param: Record<string, unknown>
    invMoveNo: string
    reasonId: number
    planMoveTime: string
    warehouseId: number
    storeareaId: number
    storeshelfId: number
    storehouseId: number
    moveUserId: number | null
    moveUser: string
    moveCompleteTime: string | null
    remarks: string
    status: string
    reasonName: string
    warehouseName: string
    storehouseName: string
    statusName: string
    invMoveItemList: null
  }
}

interface InvMoveItemList {
  id: number
  createId: number
  createName: string
  updateId: number | null
  updateName: string | null
  createTime: string
  updateTime: string
  param: Record<string, unknown>
  invMoveId: number
  goodsId: number
  moveWarehouseId: number
  moveStoreareaId: number
  moveStoreshelfId: number
  moveStorehouseId: number
  totalCount: number | null
  moveTotalCount: number | null
  differenceCount: number | null
  status: number
  storehouseName: string
}

export namespace InvMove {
  export interface CopyItem {
    invMoveNo: string
    moveCompleteTime: null
    moveUser: string
    moveUserId: null
    invMoveItemList: InvMoveItemList[]
    param: Record<string, unknown>
    planMoveTime: string
    reasonId: number
    reasonName: string
    remarks: string
    status: string
    statusName: string
    storeareaId: number
    storehouseId: number
    storehouseName: string
    storeshelfId: number
    updateId: null
    updateName: null
    updateTime: string
    warehouseId: number
    warehouseName: string
    createId: number
    createName: string
    createTime: string
    id: number
  }
}
