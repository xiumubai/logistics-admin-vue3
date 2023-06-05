<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getInvMoveList"
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
          @click="editHandle(scope.row.id)"
        >
          修改
        </el-button>
        <el-popconfirm title="确认删除吗?" @confirm="delHandle(scope.row.id)">
          <template #reference>
            <el-button
              type="primary"
              link
              :disabled="!BUTTONS['btn.warehouseInfo.update']"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
        <el-button
          type="primary"
          link
          @click="assignUser()"
          :disabled="!BUTTONS['btn.warehouseInfo.update']"
        >
          分配任务
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
    <AddModel
      v-if="dialogVisible"
      :dialogVisible="dialogVisible"
      title="新增入库预约数据"
      @close="closeHandler"
      ref="DialogRef"
      :type="dialogType"
      :editId="editId"
      @submit="addHandler"
      :warehouseIdList="warehouseIdList"
    />
    <UserAllot
      :dialogUserVisible="dialogUserVisible"
      @close="dialogUserVisible = false"
      @submit="dialogUserHandler"
    />
  </div>
</template>
<script setup lang="tsx">
import { ref, reactive, onMounted } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import { findWarehouseInfoAll, getInvMoveList, delInventoryById } from '@/api'
import { useRouter } from 'vue-router'
import AddModel from './components/AddModel/index.vue'
import UserAllot from './components/UserAllot/index.vue'
// 弹窗部分
const dialogVisible = ref(false)
const warehouseIdList = ref<any>([])
const closeHandler = () => {
  dialogVisible.value = false
}
const dialogType = ref('add') // 新增还是编辑
const editId = ref() // 编辑的id
const dialogUserVisible = ref(false) // 分配任务弹窗
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
    label: '移库单号',
    search: { el: 'input', props: { placeholder: '移库单号' } },
  },
  {
    prop: 'estimatedArrivalTime',
    isShow: false,
    label: '移库时间',
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
  { prop: 'invMoveNo', label: '移库单号' },
  { prop: 'reasonName', label: '移库原因', width: 120 },
  { prop: 'planMoveTime', label: '计划移库时间' },
  { prop: 'warehouseName', label: '仓库', width: 120 },
  { prop: 'storehouseName', label: '库位' },
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
    path: `/invMove/show/${id}`,
  })
}

// 打开Dialog
const DialogRef = ref()
const openDialog = () => {
  dialogType.value = 'add'
  dialogVisible.value = true
}
const editHandle = (id: number) => {
  dialogType.value = 'edit'
  editId.value = id
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
// 删除
const delHandle = async (id: string) => {
  const res = await delInventoryById(id)
  console.log('res', res)
}
// 分配任务
const assignUser = () => {
  // 参数可以是 id 根据业务逻辑需要使用
  dialogUserVisible.value = true
}
// 分配任务确认
const dialogUserHandler = () => {
  // 业务逻辑
}
onMounted(() => {
  findWarehouseInfoAll().then((res) => {
    if (res?.code !== 200) return
    warehouseIdList.value = res.data
  })
})
</script>

<style lang="scss" scoped></style>
