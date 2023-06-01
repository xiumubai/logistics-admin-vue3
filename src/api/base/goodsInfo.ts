/*
 * @Author: 朽木白
 * @Date: 2023-05-31 10:08:58
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-05-31 15:53:52
 * @Description: 货品管理
 */

import http from '@/utils/http'
import type { GoodsInfo } from './types'
import type { PageRes } from '../types'
import type { ReqPage } from '../types'

const api_name = '/admin/base/goodsInfo'

/**
 * 获取分页列表，带搜索
 */
export function getGoodsInfoList(params: GoodsInfo.GoodsInfoParams) {
  return http.get<GoodsInfo.ResGoodsInfoItem[]>(
    `${api_name}/${params.pageNum}/${params.pageSize}`,
    {
      keyword: params.keyword,
      status: params.status,
      goodsTypeId: params.goodsTypeId,
    },
  )
}

/**
 * @description: 删除货物
 */
export function deleteGoodsById(id: string) {
  return http.delete<PageRes<any>>(`${api_name}/remove/${id}`)
}

/**
 * @description 上线，下线
 */
export function updateStatus(id: string, status: number) {
  return http.get<PageRes<any>>(`${api_name}/updateStatus/${id}/${status}`)
}

/**
 * @description 新增货品
 * @returns {<PageRes<any>>}
 */
export function addGoodInfo(params: GoodsInfo.EditGoodsInfoParams) {
  return http.post<PageRes<any>>(`${api_name}/save`, params)
}

/**
 * @description: 编辑货品
 * @returns {<PageRes<any>>}
 */
export function updateGoodInfo(params: GoodsInfo.EditGoodsInfoParams) {
  return http.put<PageRes<any>>(`${api_name}/update`, params)
}

/**
 * @description: 获取商品类型选中id
 * @returns {*}
 */
export function findGoodsTypeIdList(id: number) {
  return http.get<PageRes<any>>(`${api_name}/findGoodsTypeIdList/${id}`)
}

/**
 * @description: 获取商品列表
 * @returns {*}
 */
export function getProductList(params: ReqPage) {
  return http.get<GoodsInfo.ResGoodsInfoItem[]>(
    `admin/product/list/${params.pageNum}/${params.pageSize}`,
  )
}
