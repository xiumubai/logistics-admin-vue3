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

export namespace StorehouseInfo {
  export interface EditStorehouseInfoParams {
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

  export interface ResStorehouseInfoItem {
    builtArea: number
    createTime: string
    houseTypeId: number
    houseTypeName: string
    id: string
    manageId: number
    manageName: string
    managePhone: string
    name: string
    status: number
    storeareaId: number
    storeareaName: string
    storehouseCount: number
    temperatureTypeId: number
    temperatureTypeName: string
    updateId: number | null
    updateName: string | null
    updateTime: string
    warehouseId: number
    warehouseName: string
  }
}

export namespace StoreshelfInfo {
  export interface EditStoreshelfInfoParams {
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

  export interface ResStoreshelfInfoItem {
    builtArea: number
    createId: number
    createName: string
    createTime: string
    houseTypeId: number
    houseTypeName: string
    id: string
    manageId: number
    manageName: string
    managePhone: string
    name: string
    status: number
    storeareaId: number
    storeareaName: string
    storehouseCount: number
    temperatureTypeId: number
    temperatureTypeName: string
    updateId: number | null
    updateName: string | null
    updateTime: string
    warehouseId: number
    warehouseName: string
    storeshelfId: number
  }
}
