/*
 * @Author: 朽木白
 * @Date: 2023-06-05 10:17:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-06 17:02:29
 * @Description: 实时库存
 */

import http from '@/utils/http'
import type { InvCounting } from './types'
import type { ReqPage } from '../types'

const api_name = '/admin/inventory/invCounting'

/**
 * 获取分页列表
 */
// InvCounting
export function getInvCountingList(params: ReqPage) {
  return http.get<InvCounting.ResInvCountingItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
  )
}

/**
 * @description: 详情
 * @param {ReqPage} params
 * @returns {*}
 */
export function getInvCountingDetail(id: string) {
  return http.get<any>(`${api_name}/show/${id}`)
}

/**
 * @description: 详情
 * @param {ReqPage} params
 * @returns {*}
 */
export function removeInvCounting(id: string) {
  return http.delete<any>(`${api_name}/remove/${id}`)
}

export function saveInvCounting(data: any) {
  return http.post<any>(`${api_name}/save`, data)
}

export function updateInvCounting(data: any) {
  return http.post<any>(`${api_name}/update`, data)
}
