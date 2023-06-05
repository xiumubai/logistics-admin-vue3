<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getInventoryInfoList"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="View"
          @click="openDialog(scope.row, '库存详情')"
        >
          库存详情
        </el-button>
        <el-button
          type="primary"
          link
          icon="View"
          @click="openDialog(scope.row, '库存日志')"
        >
          库存日志
        </el-button>
      </template>
    </ProTable>
    <Dialog ref="DialogRef" />
  </div>
</template>
<script setup lang="tsx">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { getInventoryInfoList } from '@/api'
import Dialog from './components/Dialog.vue'
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80, fixed: 'left' },
  { prop: 'name', label: '名称' },
  { prop: 'skuId', label: '关联SKU' },
  { prop: 'code', label: '品牌' },
  { prop: 'goodsTypeName', label: '商品类型' },
  { prop: 'saleAttr', label: '货品的销售属性' },
  { prop: 'inspectTypeName', label: '检验类型', width: 120 },
  { prop: 'temperatureTypeName', label: '温度类型' },
  // { prop: 'totalCount', label: '总库存' },
  // { prop: 'lockCount', label: '锁定库存' },
  // { prop: 'availableCount', label: '可用库存' },
  // { prop: 'pickingCount', label: '已拣未发货数量' },
  // { prop: 'warningCount', label: '预警数量' },
  // { prop: 'saleCount', label: '历史销量' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}
// 打开Dialog
const DialogRef = ref()
const openDialog = async (rowData: string, title: string) => {
  const params = {
    title,
    rowData,
  }
  DialogRef.value.acceptParams(params)
}
</script>

<style lang="scss" scoped></style>
