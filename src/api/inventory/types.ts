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

  export interface ResInventoryInfoDetail {
    id: string
  }
}
