/*
 * @Author: 李海波
 * @Date: 2023-06-05 10:17:03
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-06 11:31:23
 * @Description: 实时库存
 */

import http from '@/utils/http'
import type { InvCounting, InvMove } from './types'
import type { ReqPage } from '../types'
import type { PageRes } from '../types'

const api_name = '/admin/inventory/invMove'
const api_invList = '/admin/inventory/inventoryInfo/findByStorehouseId'
const api_remove = '/admin/inventory/invMove/remove'
const api_find = '/admin/acl/user/findByKeyword'
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
export function getInventoryInfoById(id: number) {
  return http.get<InvCounting.ResInvCountingItem>(`${api_invList}/${id}`)
}

// 删除
export function delInventoryById(id: string) {
  return http.get<PageRes<any>>(`${api_remove}/${id}`)
}

// 根据 id 获取信息
export function getInfoById(id: number) {
  return http.get<InvMove.CopyItem>(`${api_name}/get/${id}`)
}

// 根据 id 获取信息
export function findByKeyWord(search: string) {
  return http.get<PageRes<any>>(`${api_find}/${search}`)
}
