/*
 * @Author: 朽木白
 * @Date: 2023-06-05 10:17:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-05 10:48:48
 * @Description: 实时库存
 */

import http from '@/utils/http'
import type { InventoryInfo } from './types'
import type { ReqPage } from '../types'

const api_name = '/admin/inventory/inventoryInfo'

/**
 * 获取分页列表
 */
// InventoryInfo
export function getInventoryInfoList(params: ReqPage) {
  return http.get<InventoryInfo.ResInventoryInfoItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
  )
}

export function getInventoryInfoDetail(id: string) {
  return http.get<InventoryInfo.ResInventoryInfoDetail>(`${api_name}/get/${id}`)
}
