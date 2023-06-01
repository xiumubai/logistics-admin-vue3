/*
 * @Author: 朽木白
 * @Date: 2023-05-31 10:08:58
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-01 11:15:57
 * @Description: 货品管理
 */

import http from '@/utils/http'
import type { WarehouseInfo } from './types'
import type { PageRes } from '../types'
import type { ReqPage } from '../types'

const api_name = '/admin/base/warehouseInfo'

/**
 * 获取分页列表
 */
// WarehouseInfo
export function getWarehouseInfoList(params: ReqPage) {
  return http.get<WarehouseInfo.ResWarehouseInfoItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
  )
}

/**
 * @description: 删除货物
 */
export function deleteWarehouseInfoById(id: string) {
  return http.delete<PageRes<any>>(`${api_name}/remove/${id}`)
}

/**
 * @description 新增货品
 * @returns {<PageRes<any>>}
 */
export function addWarehouseInfo(
  params: WarehouseInfo.EditWarehouseInfoParams,
) {
  return http.post<PageRes<any>>(`${api_name}/save`, params)
}

/**
 * @description: 编辑货品
 * @returns {<PageRes<any>>}
 */
export function updateWarehouseInfo(
  params: WarehouseInfo.EditWarehouseInfoParams,
) {
  return http.put<PageRes<any>>(`${api_name}/update`, params)
}
