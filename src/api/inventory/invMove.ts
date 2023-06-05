/*
 * @Author: 李海波
 * @Date: 2023-06-05 10:17:03
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-05 18:24:09
 * @Description: 实时库存
 */

import http from '@/utils/http'
import type { InvCounting } from './types'
import type { ReqPage } from '../types'
import type { PageRes } from '../types'

const api_name = '/admin/inventory/invMove/'
const api_invList = '/admin/inventory/inventoryInfo/findByStorehouseId/'
const api_remove = '/admin/inventory/invMove/remove'
/**
 * 获取分页列表
 */
// invMove
export function getInvMoveList(params: ReqPage) {
  return http.get<InvCounting.InvMoveItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
  )
}

// 新增或修改获取列表
export function getInventoryInfoById(id: string) {
  return http.get<InvCounting.ResInvCountingItem>(`${api_invList}/get/${id}`)
}

// 删除
export function delInventoryById(id: string) {
  return http.get<PageRes<any>>(`${api_remove}/get/${id}`)
}
