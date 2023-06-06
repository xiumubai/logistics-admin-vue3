/*
 * @Author: 朽木白
 * @Date: 2023-06-05 10:17:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-06 17:02:28
 * @Description: 实时库存
 */

import http from '@/utils/http'
import type { InvCountingTask } from './types'
import type { ReqPage } from '../types'
import { PageRes } from '../types'

const api_name = '/admin/inventory/invCountingTask'

/**
 * 获取分页列表
 */
// InvCountingTask
export function getInvCountingTaskList(params: ReqPage) {
  return http.get<InvCountingTask.ResInvCountingTaskItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
  )
}

/**
 * @description: 分配任务
 * @param {ReqPage} params
 * @returns {*}
 */
export function assignInvCountingTask(data: InvCountingTask.ReqAssignParams) {
  return http.post<PageRes<any>>(`${api_name}/assign`, data)
}

/**
 * 更新数据
 * @param
 * @returns
 */
export function updateInvCountingTask(data: any) {
  return http.post<PageRes<any>>(`${api_name}/update`, data)
}
