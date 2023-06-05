/*
 * @Author: 李海波
 * @Date: 2023-06-05 10:17:03
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-06 15:09:17
 * @Description: 实时库存
 */

import http from '@/utils/http'
import type { InvMoveTask } from './types'
import type { ReqPage } from '../types'
import type { PageRes } from '../types'

const api_name = '/admin/inventory/invMoveTask'
const api_show = '/admin/inventory/invMove/show'
/**
 * 获取分页列表
 */
// invMove
export function getInvMoveTaskList(params: ReqPage) {
  return http.get<InvMoveTask.MoveTaskItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
  )
}

// 根据 id 获取信息
export function showMoveInfoById(id: number) {
  return http.get<PageRes<any>>(`${api_show}/${id}`)
}
