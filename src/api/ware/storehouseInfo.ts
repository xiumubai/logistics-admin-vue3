/*
 * @Author: 朽木白
 * @Date: 2023-05-31 10:08:58
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-01 15:07:55
 * @Description: 库位管理
 */

import http from '@/utils/http'
import type { StorehouseInfo } from './types'
import type { PageRes } from '../types'
import type { ReqPage } from '../types'

const api_name = '/admin/base/storehouseInfo'

/**
 * 获取分页列表
 */
// StorehouseInfo
export function getStorehouseInfoList(params: ReqPage) {
  return http.get<StorehouseInfo.EditStorehouseInfoParams[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
  )
}

/**
 * @description: 删除货物
 */
export function deleteStorehouseInfoById(id: string) {
  return http.delete<PageRes<any>>(`${api_name}/remove/${id}`)
}

/**
 * @description 新增货品
 * @returns {<PageRes<any>>}
 */
export function addStorehouseInfo(
  params: StorehouseInfo.ResStorehouseInfoItem,
) {
  return http.post<PageRes<any>>(`${api_name}/save`, params)
}

/**
 * @description: 编辑货品
 * @returns {<PageRes<any>>}
 */
export function updateStorehouseInfo(
  params: StorehouseInfo.ResStorehouseInfoItem,
) {
  return http.put<PageRes<any>>(`${api_name}/update`, params)
}
