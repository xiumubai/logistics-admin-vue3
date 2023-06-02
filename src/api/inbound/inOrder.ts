/*
 * @Description:入库预约
 * @Autor: codeBo
 * @Date: 2023-06-01 15:02:00
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-02 16:53:52
 */
import http from '@/utils/http'
import type { InOrderInfo } from './type'
import type { PageRes } from '../types'
const api_name = '/admin/inbound/inOrder/'
const api_findKeyWord = '/admin/base/shipperInfo/findByKeyword/'
const api_detail = '/admin/inbound/inOrder/show'

/**
 * 新增的时候获取货主名称列表
 */
export function getDetailList(id: string) {
  return http.get<InOrderInfo.detail>(`${api_detail}/${id}`)
}
/**
 * 获取分页列表
 */
// InOrderInfo
export function getInOrderInfoList(params: InOrderInfo.ReqPage) {
  return http.get<InOrderInfo.inOrderItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
    { no: params.no, warehouseId: params.warehouseId },
  )
}
/**
 * 新增的时候获取货主名称列表
 */
export function getFindKeyWordList(id: string) {
  return http.get<InOrderInfo.Warehouse[]>(`${api_findKeyWord}/${id}}`)
}

/**
 * @description: 删除货物
 */
export function deleteStoreareaInfoById(id: string) {
  return http.delete<PageRes<any>>(`${api_name}/remove/${id}`)
}
