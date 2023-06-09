/*
 * @Author: 朽木白
 * @Date: 2023-05-29 14:27:58
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-05-31 14:29:09
 * @Description: 数据字典
 */
import http from '@/utils/http'
import { Dict } from './types'

const api_name = '/admin/base/dict'

/**
 * 获取编码字典数据
 */
export function findByParentId(parentId: number | string) {
  return http.get<Dict.DictCodeItem[]>(`${api_name}/findByParentId/${parentId}`)
}

/**
 * 获取编码字典数据
 */
export function findByDictCode(dictCode: string) {
  return http.get<Dict.DictCodeItem[]>(`${api_name}/findByDictCode/${dictCode}`)
}
