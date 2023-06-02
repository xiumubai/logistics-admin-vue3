<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getOutPickingTaskList"
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
import { getOutPickingTaskList } from '@/api'
import Dialog from './components/Dialog.vue'
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'taskNo', label: '拣货任务编号' },
  { prop: 'warehouseName', label: '仓库' },
  { prop: 'storeshelfName', label: '货架号' },
  { prop: 'pickingCount', label: '拣货数量' },
  { prop: 'pickingUser', label: '拣货人' },
  { prop: 'pickingTime', label: '拣货时间', width: 120 },
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
