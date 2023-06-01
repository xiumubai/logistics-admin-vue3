/*
 * @Author: 朽木白
 * @Date: 2023-05-31 10:08:58
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-01 11:36:25
 * @Description: 库区管理
 */

import http from '@/utils/http'
import type { StoreareaInfo } from './types'
import type { PageRes } from '../types'
import type { ReqPage } from '../types'

const api_name = '/admin/base/storeareaInfo'

/**
 * 获取分页列表
 */
// StoreareaInfo
export function getStoreareaInfoList(params: ReqPage) {
  return http.get<StoreareaInfo.ResStoreareaInfoItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
  )
}

/**
 * @description: 删除货物
 */
export function deleteStoreareaInfoById(id: string) {
  return http.delete<PageRes<any>>(`${api_name}/remove/${id}`)
}

/**
 * @description 新增货品
 * @returns {<PageRes<any>>}
 */
export function addStoreareaInfo(
  params: StoreareaInfo.EditStoreareaInfoParams,
) {
  return http.post<PageRes<any>>(`${api_name}/save`, params)
}

/**
 * @description: 编辑货品
 * @returns {<PageRes<any>>}
 */
export function updateStoreareaInfo(
  params: StoreareaInfo.EditStoreareaInfoParams,
) {
  return http.put<PageRes<any>>(`${api_name}/update`, params)
}
