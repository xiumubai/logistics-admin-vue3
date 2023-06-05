<template>
  <el-dialog
    v-model="dialogVisible"
    title="关联SKU"
    :destroy-on-close="true"
    width="50%"
  >
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :toolButton="false"
      :requestApi="dialogProps.api"
    ></ProTable>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="RoleDialog">
import type { ColumnProps } from '@/components/ProTable/src/types'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
interface DialogProps {
  api?: (params: any) => Promise<any>
}

const emit = defineEmits(['update-name'])

const dialogVisible = ref(false)
const loading = ref<boolean>(false)
const selectedNameList = ref()
// props定义
// title 需要给个默认值，否则ts会提示为空值
const dialogProps = ref<DialogProps>({})

// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  dialogProps.value = params
  dialogVisible.value = true
}

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 80 },
  { type: 'index', label: '#', width: 80 },
  { prop: 'id', label: 'ID' },
  { prop: 'skuName', label: '名称', width: 100 },
]

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}
const proTable = ref()
const handleSubmit = () => {
  if (proTable.value?.selectedListIds.length === 0) {
    ElMessage({
      type: 'warning',
      message: '请选择一条记录',
    })
    return
  }
  let list: string[] = []
  const tableData = proTable.value?.tableData
  const selectedListIds = proTable.value?.selectedListIds
  tableData.forEach((item: any) => {
    selectedListIds.forEach((element: any) => {
      if (item.id === element) {
        list.push(item.skuName)
      }
    })
  })
  selectedNameList.value = list
  emit('update-name', list)
  dialogVisible.value = false
}

// 暴露给父组件的方法
defineExpose({
  acceptParams,
  selectedNameList,
})
</script>

<style lang="scss" scoped></style>
