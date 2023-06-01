export namespace WarehouseInfo {
  export interface EditWarehouseInfoParams {
    areaId: number
    cityId: number
    address: string
    builtArea: string
    id: string
    manageName: string
    managePhone: string
    name: string
    provinceId: number
    status: number
    storeareaCount: number
    storehouseCount: number
    storeshelfCount: number
    type: number
    manageId: number
  }

  export interface ResWarehouseInfoItem {
    address: string
    areaId: number
    areaName: string
    builtArea: number
    cityId: number
    cityName: string
    createId: number | null
    createName: string | null
    createTime: string
    distance: null
    id: string
    manageId: number
    manageName: string
    managePhone: string
    name: string
    provinceId: number
    provinceName: string
    status: number
    storeareaCount: number
    storehouseCount: number
    storeshelfCount: number
    type: number
    updateId: number
    updateName: string
    updateTime: string
  }
}

export namespace StoreareaInfo {
  export interface EditStoreareaInfoParams {
    areaId: number
    cityId: number
    address: string
    builtArea: string
    id: string
    manageName: string
    managePhone: string
    name: string
    provinceId: number
    status: number
    storeareaCount: number
    storehouseCount: number
    storeshelfCount: number
    type: number
    manageId: number
  }

  export interface ResStoreareaInfoItem {
    address: string
    areaId: number
    warehouseId: number
    areaTypeId: number
    areaName: string
    builtArea: number
    cityId: number
    cityName: string
    createId: number | null
    createName: string | null
    createTime: string
    distance: null
    id: string
    manageId: number
    manageName: string
    managePhone: string
    name: string
    provinceId: number
    provinceName: string
    status: number
    storeareaCount: number
    storehouseCount: number
    storeshelfCount: number
    type: number
    updateId: number
    updateName: string
    updateTime: string
  }
}
