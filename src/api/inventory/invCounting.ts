/*
 * @Author: 朽木白
 * @Date: 2023-06-05 10:17:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-05 16:44:47
 * @Description: 实时库存
 */

import http from '@/utils/http'
import type { InvCounting } from './types'
import type { ReqPage } from '../types'
// import { PageRes } from '../types'

const api_name = '/admin/inventory'

/**
 * 获取分页列表
 */
// InvCounting
export function getInvCountingList(params: ReqPage) {
  return http.get<InvCounting.ResInvCountingItem[]>(
    `${api_name}/invCounting/${params.pageNum}/${params.pageSize}`,
  )
}

/**
 * @description: 详情
 * @param {ReqPage} params
 * @returns {*}
 */
export function getInvCountingDetail(id: string) {
  console.log(id)

  return http.get<InvCounting.ResInvCountingItem[]>(
    `${api_name}/invCounting/show/${id}`,
  )
}
