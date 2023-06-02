/*
 * @Author: 朽木白
 * @Date: 2023-06-02 14:00:48
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-02 16:28:15
 * @Description: 发货任务
 */
import http from '@/utils/http'
import type { OutDeliverTask } from './types'
import type { ReqPage } from '../types'

const api_name = '/admin/outbound/outDeliverTask'

/**
 * 获取分页列表
 */
// OutDeliverTask
export function getOutDeliverTaskList(params: ReqPage) {
  return http.get<OutDeliverTask.ResOutDeliverTaskItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
  )
}
