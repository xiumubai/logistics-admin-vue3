import type { ReqPage } from '../types'

export namespace Dict {
  export interface DictCodeItem {
    createTime: string
    dictCode: string
    hasChildren?: boolean
    id: number
    name: string
    label?: string
  }
}

export namespace Shipper {
  export interface ShipperListParams extends ReqPage {
    keyword?: string
    provinceCode?: number
    cityCode?: number
    areaCode?: number
  }

  export interface EidtShipperParams {
    address: string
    areaId: number
    cityId: number
    id?: string
    name: string
    phone: string
    provinceId: number
    remark: string
    status?: string
  }

  export interface ShipperResItem {
    address: string
    areaId: number
    areaName: string
    cityId: number
    cityName: string
    id: string
    name: string
    phone: string
    provinceId: number
    provinceName: string
  }
}

export namespace GoodsType {
  export interface ResGoodsType {
    children: ResGoodsType[]
    createTime: string
    hasChildren: boolean
    id: number
    name: string
  }
}

export namespace GoodsInfo {
  export interface GoodsInfoParams extends ReqPage {
    keyword?: string
    status?: string
    goodsTypeId?: string
  }

  export interface EditGoodsInfoParams {
    name: string
    code: number
    goodsTypeId: number
    temperatureTypeId: number
    volume: number
    unitId: number
    baseCount: number
    barcode: number
    brandName: string
    inspectTypeId: number
    saleAttr: string
    weight: number
    baseUnitId: number
  }

  export interface ResGoodsInfoItem {
    barcode: string
    baseCount: number
    baseUnitId: number
    baseUnitName: string
    brandName: string
    code: string
    createId: number
    createName: string
    createTime: string
    goodsTypeId: number
    goodsTypeName: string
    id: string
    inspectTypeId: number
    inspectTypeName: string
    inventoryInfoList: null
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
}

export namespace WareConfig {
  export interface ResWareConfig {
    createName: string | null
    createTime: string
    dimension: string
    id: number
    intervalTime: number
    relationUrl: string
    status: number
    unlockTime: number
    updateId: number
    updateName: string
    updateTime: string
  }
}
