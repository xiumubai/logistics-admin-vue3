/*
 * @Description:入库审批
 * @Autor: codeBo
 * @Date: 2023-06-01 15:02:00
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-05 11:46:07
 */
import http from '@/utils/http'
import type { InOrderInfo } from './type'
const api_detail = '/admin/inbound/inApproveTask/'

/**
 * 获取分页列表
 */
// InOrderInfo
export function getInApproveTaskList(params: InOrderInfo.ReqPage) {
  return http.get<InOrderInfo.InOrderItem[]>(
    `${api_detail}/${params.pageNum}/${params.pageSize}`,
    { no: params.no, warehouseId: params.warehouseId },
  )
}
