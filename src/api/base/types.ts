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
