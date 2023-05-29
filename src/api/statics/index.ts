/*
 * @Author: 朽木白
 * @Date: 2023-05-29 11:43:21
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-05-29 11:49:37
 * @Description: 数据统计
 */

import http from '@/utils/http'
import { StaticRes } from './types'
/**
 * 获取统计信息
 */
export function getStatics(type: string) {
  return http.get<StaticRes>(`/admin/inventory/invStatistics/get/${type}`)
}
