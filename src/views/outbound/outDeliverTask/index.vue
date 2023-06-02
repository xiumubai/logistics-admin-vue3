<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getOutDeliverTaskList"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="View"
          @click="openDialog(scope.row.id)"
        >
          查看
        </el-button>
      </template>
    </ProTable>
    <Dialog ref="DialogRef" />
  </div>
</template>
<script setup lang="tsx">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { getOutDeliverTaskList } from '@/api'
import Dialog from './components/Dialog.vue'
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'taskNo', label: '任务编号' },
  { prop: 'outOrderNo', label: '出库单号' },
  { prop: 'warehouseName', label: '仓库' },
  { prop: 'consignee', label: '收货人' },
  { prop: 'consigneeTel', label: '收件人电话' },
  { prop: 'deliveryAddress', label: '送货地址' },
  { prop: 'deliverCount', label: '发货数量' },
  { prop: 'deliverUser', label: '发货人' },
  { prop: 'deliverTime', label: '发货时间' },
  { prop: 'trackingNo', label: '物流单号' },
  { prop: 'trackingCompany', label: '物流公司' },
  { prop: 'statusName', label: '状态' },
  { prop: 'createTime', label: '创建时间', width: 120 },
  { prop: 'operation', label: '操作', fixed: 'right', width: 180 },
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
const openDialog = async (id: string) => {
  const params = {
    id: id,
  }
  DialogRef.value.acceptParams(params)
}
</script>

<style lang="scss" scoped></style>
