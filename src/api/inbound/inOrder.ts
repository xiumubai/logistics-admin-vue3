/*
 * @Description:入库预约
 * @Autor: codeBo
 * @Date: 2023-06-01 15:02:00
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-01 16:03:07
 */
import http from '@/utils/http'
import type { InOrderInfo } from './type'
import type { PageRes } from '../types'
const api_name = '/admin/inbound/inOrder/'
const api_findAll = '/admin/base/warehouseInfo/findAll'

/**
 * 获取分页列表
 */
// InOrderInfo
export function getAllSelectList() {
  return http.get<InOrderInfo.Warehouse[]>(`${api_findAll}`)
}

/**
 * 获取分页列表
 */
// InOrderInfo
export function getInOrderInfoList(params: InOrderInfo.ReqPage) {
  return http.get<InOrderInfo.inOrderItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
    { no: params.no },
  )
}

/**
 * @description: 删除货物
 */
export function deleteStoreareaInfoById(id: string) {
  return http.delete<PageRes<any>>(`${api_name}/remove/${id}`)
}
