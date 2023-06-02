/*
 * @Author: 朽木白
 * @Date: 2023-06-02 14:00:48
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-02 14:43:57
 * @Description: 出库单管理
 */
import http from '@/utils/http'
import type { OutOrder } from './types'
import type { ReqPage } from '../types'

const api_name = '/admin/outbound/outOrder'

/**
 * 获取分页列表
 */
// OutOrder
export function getOutOrderList(params: ReqPage) {
  return http.get<OutOrder.ResOutOrderItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
  )
}

export function getOutOrderDetail(id: string) {
  return http.get<OutOrder.OrderDetail>(`${api_name}/show/${id}`)
}
