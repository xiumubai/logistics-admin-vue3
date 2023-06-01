/*
 * @Author: 朽木白
 * @Date: 2023-05-31 16:09:28
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-05-31 16:22:08
 * @Description: wareConfig 管理
 */
import http from '@/utils/http'
import type { WareConfig } from './types'
const api_name = '/admin/base/wareConfig'

export function getConfig() {
  return http.get<WareConfig.ResWareConfig>(`${api_name}/get`)
}
