import http from '@/utils/http'
import type { IWareConfig } from './types'
const api_name = '/admin/base/wareConfig'

export function getWareConfig() {
  return http.get<IWareConfig.ResWareConfig>(`${api_name}/get`)
}
