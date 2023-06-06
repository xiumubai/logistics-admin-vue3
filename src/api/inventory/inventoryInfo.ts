/*
 * @Author: 朽木白
 * @Date: 2023-06-05 10:17:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-06 17:06:05
 * @Description: 实时库存
 */

import http from '@/utils/http'
import type { InventoryInfo, ReqInvLog } from './types'
import type { ReqPage } from '../types'
import { PageRes } from '../types'

const api_name = '/admin/inventory'

/**
 * 获取分页列表
 */
// InventoryInfo
export function getInventoryInfoList(params: ReqPage) {
  return http.get<InventoryInfo.ResInventoryInfoItem[]>(
    `${api_name}/inventoryInfo/${params.pageNum}/${params.pageSize}`,
  )
}

/**
 * 库存日志
 * @param params
 * @returns
 */
export function getInvLogList(params: ReqInvLog) {
  return http.get<InventoryInfo.ResInventoryInfoItem[]>(
    `${api_name}/invLog/${params.pageNum}/${params.pageSize}`,
    {
      goodsId: params.goodsId,
    },
  )
}

/**
 * 上架库存
 * @param params
 * @returns
 */
export function updateInventory(params: InventoryInfo.InventoryParams) {
  return http.post<PageRes<any>>(
    `${api_name}/inventoryInfo/updateInventory`,
    params,
  )
}

export function findByStorehouseId(storehouseId: string) {
  return http.get<PageRes<any>>(
    `${api_name}/inventoryInfo/findByStorehouseId/${storehouseId}`,
  )
}
