/*
 * @Author: 朽木白
 * @Date: 2023-05-29 14:27:58
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-05 17:04:54
 * @Description: 货主管理
 */
import http from '@/utils/http'
import type { Shipper } from './types'
import type { PageRes } from '../types'

const api_name = '/admin/base/shipperInfo'

/**
 * 获取分野列表，带搜索
 */
export function getShipperList(params: Shipper.ShipperListParams) {
  return http.get<Shipper.ShipperResItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
    {
      keyword: params.keyword,
      provinceId: params.provinceCode,
      cityId: params.cityCode,
      areaId: params.areaCode,
    },
  )
}

/**
 * @description: 删除用户
 */
export function deleteShipperById(id: string) {
  return http.delete<PageRes<any>>(`${api_name}/remove/${id}`)
}

/**
 * @description 新增用户
 * @returns {<PageRes<any>>}
 */
export function addShipper(params: Shipper.EidtShipperParams) {
  return http.post<PageRes<any>>(`${api_name}/save`, params)
}

/**
 * @description: 编辑用户
 * @returns {<PageRes<any>>}
 */
export function updateShipper(params: Shipper.EidtShipperParams) {
  return http.put<PageRes<any>>(`${api_name}/update`, params)
}
