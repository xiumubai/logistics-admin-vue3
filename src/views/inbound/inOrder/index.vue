<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getInOrderInfoList"
      :resetCallback="clearAll"
    >
      <template #tableHeader>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!BUTTONS['btn.warehouseInfo.add']"
          @click="openDialog"
        >
          添加
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
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
    <Dialog
      v-if="dialogVisible"
      :dialogVisible="dialogVisible"
      title="新增入库预约数据"
      @close="closeHandler"
      ref="DialogRef"
      @submit="addHandler"
      :warehouseIdList="warehouseIdList"
    />
  </div>
</template>
<script setup lang="tsx">
import { ref, reactive, onMounted } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import { findWarehouseInfoAll, getInOrderInfoList } from '@/api'
import { useRouter } from 'vue-router'
import Dialog from './components/AddModel/index.vue'
// 弹窗部分
const dialogVisible = ref(false)
const warehouseIdList = ref<any>([])
const closeHandler = () => {
  dialogVisible.value = false
}
const { BUTTONS } = useAuthButtons()
const router = useRouter()
const statusList = [
  { id: 0, name: '新建' },
  { id: 1, name: '审批中' },
  { id: 2, name: '收货中' },
  { id: 3, name: '上架中' },
  { id: 4, name: '库存同步中' },
  { id: 5, name: '完成' },
  { id: -1, name: '审批驳回' },
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
    search: { el: 'input', props: { placeholder: '入库单号/货主订单号' } },
  },
  {
    prop: 'estimatedArrivalTime',
    isShow: false,
    label: '预计到达',
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
    prop: 'warehouseId',
    isShow: false,
    label: '指定仓库',
    enum: findWarehouseInfoAll,
    fieldNames: { label: 'name', value: 'id' },
    search: { el: 'select', props: { placeholder: '请选择指定仓库' } },
  },
  {
    prop: 'status',
    label: '状态',
    isShow: false,
    search: {
      el: 'select',
      render: () => {
        return (
          <el-select v-model={status} placeholder="请选择区" clearable>
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
  { prop: 'inOrderNo', label: '入库单号' },
  { prop: 'shipperOrderNo', label: '货主订单号', width: 120 },
  { prop: 'shipperName', label: '货主名称' },
  { prop: 'estimatedArrivalTime', label: '预计到达日', width: 120 },
  { prop: 'warehouseName', label: '仓库' },
  { prop: 'driver', label: '司机' },
  { prop: 'driverPhone', label: '司机电话' },
  { prop: 'expectCount', label: '预期到货数量', width: 120 },
  {
    prop: 'statusName',
    label: '状态',
  },
  { prop: 'createTime', label: '创建时间' },
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

const goShow = (id: number) => {
  router.push({
    path: `/inbound/inOrder/show/${id}`,
  })
}

// 打开Dialog
const DialogRef = ref()
const openDialog = () => {
  dialogVisible.value = true
}
// 新增确认事件
const addHandler = (res: {
  dataSource: Record<string, string | number>[]
  formInline: Record<string, string | number>
}) => {
  console.log('res', res)
}

// 点击重置的时候，清除省/市/区的数据
const clearAll = () => {
  dictList.timeValue = []
  dictList.warehouse = ''
  dictList.warehouseList = []
}

onMounted(() => {
  findWarehouseInfoAll().then((res) => {
    if (res?.code !== 200) return
    warehouseIdList.value = res.data
  })
})
</script>

<style lang="scss" scoped></style>
