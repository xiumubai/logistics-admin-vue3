/*
 * @Author: 朽木白
 * @Date: 2023-06-05 10:17:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-05 17:51:28
 * @Description: 实时库存
 */

import http from '@/utils/http'
import type { InvCounting } from './types'
// import type { ReqPage } from '../types'
import { PageRes } from '../types'

const api_name = '/admin/inventory/invCountingTask'

/**
 * @description: 分配任务
 * @param {ReqPage} params
 * @returns {*}
 */
export function assignInvCountingTask(data: InvCounting.ReqAssignParams) {
  return http.post<PageRes<any>>(`${api_name}/assign`, data)
}
