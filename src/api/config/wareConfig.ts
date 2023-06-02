import http from '@/utils/http'
import type { IWareConfig } from './types'
import type { PageRes } from '../types'

const api_name = '/admin/base/wareConfig'

export function getWareConfig() {
  return http.get<IWareConfig.ResWareConfig>(`${api_name}/get`)
}

export function updateWareConfig(config: IWareConfig.ResWareConfig) {
  return http.put<PageRes<any>>(`${api_name}/update`, config)
}
