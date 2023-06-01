/*
 * @Author: 朽木白
 * @Date: 2023-05-31 10:08:58
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-01 15:12:54
 * @Description: 货架管理
 */

import http from '@/utils/http'
import type { StoreshelfInfo } from './types'
import type { PageRes } from '../types'
import type { ReqPage } from '../types'

const api_name = '/admin/base/storeshelfInfo'

/**
 * 获取分页列表
 */
// StoreshelfInfo
export function getStoreshelfInfoList(params: ReqPage) {
  return http.get<StoreshelfInfo.EditStoreshelfInfoParams[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
  )
}

/**
 * @description: 删除货物
 */
export function deleteStoreshelfInfoById(id: string) {
  return http.delete<PageRes<any>>(`${api_name}/remove/${id}`)
}

/**
 * @description 新增货品
 * @returns {<PageRes<any>>}
 */
export function addStoreshelfInfo(
  params: StoreshelfInfo.ResStoreshelfInfoItem,
) {
  return http.post<PageRes<any>>(`${api_name}/save`, params)
}

/**
 * @description: 编辑货品
 * @returns {<PageRes<any>>}
 */
export function updateStoreshelfInfo(
  params: StoreshelfInfo.ResStoreshelfInfoItem,
) {
  return http.put<PageRes<any>>(`${api_name}/update`, params)
}
