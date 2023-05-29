/*
 * @Author: 朽木白
 * @Date: 2023-05-29 14:27:58
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-05-29 15:03:36
 * @Description: 货主管理
 */
import http from '@/utils/http'
import { Shipper } from './types'

const api_name = '/admin/base/shipperInfo'

/**
 * 获取编码字典数据
 */
export function findByParentId(parentId: number) {
  return http.get<Shipper.ShipperResItem[]>(
    `${api_name}/findByParentId/${parentId}`,
  )
}
