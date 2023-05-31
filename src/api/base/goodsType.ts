/*
 * @Author: 朽木白
 * @Date: 2023-05-31 09:33:33
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-05-31 09:52:06
 * @Description: 货品分类
 */

import http from '@/utils/http'
import type { GoodsType } from './types'

const api_name = '/admin/base/goodsType'

/**
 * 根据上级id获取子节点数据列表
 */
export function getGoodsTypeList(id: number) {
  return http.get<GoodsType.ResGoodsType[]>(`${api_name}/findByParentId/${id}`)
}

/**
 * 查询三级分类节点
 */
export function getGoodsNodeList() {
  return http.get<GoodsType.ResGoodsType[]>(`${api_name}/findNodes`)
}
