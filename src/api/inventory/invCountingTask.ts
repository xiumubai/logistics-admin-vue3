/*
 * @Author: 朽木白
 * @Date: 2023-06-05 10:17:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-07 16:26:07
 * @Description: 实时库存
 */

import http from '@/utils/http'
import type { InvCountingTask } from './types'
import { PageRes } from '../types'

const api_name = '/admin/inventory/invCountingTask'

/**
 * 获取分页列表
 * createTimeBegin: 2023-06-06 00:00:00
 * createTimeEnd: 2023-06-07 00:00:00
 */
// InvCountingTask
export function getInvCountingTaskList(params: InvCountingTask.TaskParams) {
  const createTimeBegin =
    params.createTime && params.createTime.length > 0 && params.createTime[0]
  const createTimeEnd =
    params.createTime && params.createTime.length > 0 && params.createTime[1]
  return http.get<InvCountingTask.ResInvCountingTaskItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
    {
      no: params.no,
      status: params.status,
      createTimeBegin,
      createTimeEnd,
    },
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
