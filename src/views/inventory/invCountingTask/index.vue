<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getInvCountingTaskList"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          v-if="scope.row.status == 'PENDING_DEAL'"
          type="primary"
          link
          icon="CircleCheck"
          @click="openDialog(scope.row.id)"
        >
          完成
        </el-button>
        <el-button
          type="primary"
          icon="View"
          link
          @click="handleView(scope.row.id)"
        >
          详情
        </el-button>
      </template>
    </ProTable>
    <Dialog ref="DialogRef" />
  </div>
</template>
<script setup lang="tsx">
import { ref, computed } from 'vue'
import { ColumnProps, EnumProps } from '@/components/ProTable/src/types'
import { getInvCountingTaskList } from '@/api'
import { useRouter } from 'vue-router'
import Dialog from './components/Dialog.vue'
const router = useRouter()
const statusList = [
  { id: 0, name: '待处理' },
  { id: 1, name: '完成' },
]

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'no',
    label: '单号',
    isShow: false,
    search: { el: 'input', props: { placeholder: '任务单号/盘点单号' } },
  },
  {
    prop: 'status',
    label: '状态',
    isShow: false,
    enum: computed(() => {
      return statusList || []
    }) as unknown as EnumProps[],
    fieldNames: { label: 'name', value: 'id' },
    search: {
      el: 'select',
    },
  },
  { prop: 'taskNo', label: '任务编号' },
  { prop: 'invCountingNo', label: '盘点单号' },
  { prop: 'countingUser', label: '任务执行人', width: 100 },
  { prop: 'countingCompleteTime', label: '操作完成时间', width: 120 },
  { prop: 'statusName', label: '状态', width: 100 },
  { prop: 'createName', label: '创建人', width: 100 },
  // { prop: 'createTime', label: '创建时间', width: 100 },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 180,
    search: {
      el: 'date-picker',
      span: 2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
      // defaultValue: ['2022-11-12 11:35:00', '2022-12-12 11:35:00'],
    },
  },
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
const openDialog = async (id: number) => {
  const params = {
    id,
    getTableList: proTable.value?.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *查看详情
const handleView = (id: number) => {
  router.push({
    path: `/invCounting/show/${id}`,
  })
}
</script>

<style lang="scss" scoped></style>
