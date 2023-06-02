/*
 * @Author: 朽木白
 * @Date: 2023-06-02 14:00:48
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-02 16:17:26
 * @Description: 出库单管理
 */
import http from '@/utils/http'
import type { OutPickingTask } from './types'
import type { ReqPage } from '../types'

const api_name = '/admin/outbound/outPickingTask'

/**
 * 获取分页列表
 */
// OutPickingTask
export function getOutPickingTaskList(params: ReqPage) {
  return http.get<OutPickingTask.ResOutPickingTaskItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
  )
}

export function getOutPickingTaskDetail(id: string) {
  return http.get<OutPickingTask.ResOutPickingDetail>(`${api_name}/get/${id}`)
}
