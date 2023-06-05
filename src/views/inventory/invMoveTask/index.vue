<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getInvMoveTaskList"
      :resetCallback="clearAll"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          :disabled="!BUTTONS['btn.warehouseInfo.update']"
          @click="openDialog(scope.row.invMoveId)"
        >
          完成
        </el-button>
        <el-button
          type="primary"
          link
          :disabled="!BUTTONS['btn.warehouseInfo.update']"
          @click="goShow(scope.row.id)"
        >
          详情
        </el-button>
      </template>
    </ProTable>
    <DoneModel
      v-if="dialogVisible"
      :dialogVisible="dialogVisible"
      @close="() => (dialogVisible = false)"
      :editId="editId"
      @submit="updateHandler"
      :warehouseIdList="warehouseIdList"
    />
  </div>
</template>
<script setup lang="tsx">
import { ref, reactive, onMounted } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import { findNodesList, getInvMoveTaskList } from '@/api'
import { useRouter } from 'vue-router'
import DoneModel from './components/DoneModel/index.vue'
// 弹窗部分
const dialogVisible = ref(false)
const editId = ref()
const warehouseIdList = ref<any>([])
const { BUTTONS } = useAuthButtons()
const router = useRouter()
const statusList = [
  { id: 0, name: '待处理' },
  { id: 1, name: '完成' },
]
// 数据
const dictList = reactive({
  warehouseList: [] as any, // 指定仓库数据
  warehouse: '',
  timeValue: [],
})

// *表格配置项
const columns: ColumnProps[] = [
  {
    prop: 'no',
    isShow: false,
    label: '相关单号',
    search: { el: 'input', props: { placeholder: '相关单号' } },
  },
  {
    prop: 'estimatedArrivalTime',
    isShow: false,
    label: '创建时间',
    search: {
      el: 'date-picker',
      render: () => {
        return (
          <el-date-picker
            v-model={dictList.timeValue}
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        )
      },
    },
  },
  {
    prop: 'status',
    label: '状态',
    isShow: false,
    search: {
      el: 'select',
      render: () => {
        return (
          <el-select v-model={status} placeholder="请选择状态" clearable>
            {statusList.map((item) => (
              <el-option
                key={item.id}
                label={item.name}
                value={item.id}
              ></el-option>
            ))}
          </el-select>
        )
      },
    },
  },
  { type: 'index', label: '序号', width: 80 },
  { prop: 'taskNo', label: '任务编号' },
  { prop: 'invMoveNo', label: '移动单号', width: 120 },
  { prop: 'moveUser', label: '任务执行人' },
  { prop: 'moveCompleteTime', label: '操作完成时间', width: 120 },
  {
    prop: 'statusName',
    label: '状态',
  },
  { prop: 'createTime', label: '创建时间' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 240 },
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

const goShow = (id: number) => {
  router.push({
    path: `/invMoveTask/show/${id}`,
  })
}

// 打开Dialog
const openDialog = (id: number) => {
  editId.value = id
  dialogVisible.value = true
}
const updateHandler = ({ inventoryInfoList }: any) => {
  console.log('res', inventoryInfoList)
}
// 点击重置的时候，清除省/市/区的数据
const clearAll = () => {
  dictList.timeValue = []
  dictList.warehouse = ''
  dictList.warehouseList = []
}
onMounted(() => {
  findNodesList().then((res) => {
    if (res?.code !== 200) return
    warehouseIdList.value = res.data
    console.log('warehouseIdList', warehouseIdList.value)
  })
})
</script>

<style lang="scss" scoped></style>
