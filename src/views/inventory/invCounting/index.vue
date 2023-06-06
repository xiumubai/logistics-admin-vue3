<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getInvCountingList"
    >
      <template #tableHeader>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!BUTTONS['btn.goodsInfo.add']"
          @click="openDialog('新增')"
        >
          添加
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          v-if="scope.row.status === 'CREATE'"
          type="primary"
          link
          icon="Edit"
          :disabled="!BUTTONS['btn.goodsInfo.update']"
          @click="openDialog('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="scope.row.status === 'CREATE'"
          type="primary"
          link
          icon="Delete"
          :disabled="!BUTTONS['btn.goodsInfo.remove']"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
        <el-button
          v-if="scope.row.status === 'CREATE'"
          type="primary"
          link
          icon="Top"
          @click="handleAssign(scope.row.id)"
        >
          分配
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
    <Drawer ref="DrawerRef" />
    <el-dialog title="分配任务" v-model="dialogUserVisible" width="40%">
      <el-form label-width="120px">
        <el-form-item label="任务执行人">
          <el-autocomplete
            v-model="invCountingTaskFormVo.countingUser"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            @select="handleSelect"
            placeholder="搜索任务执行人"
            value-key="name"
            style="width: 80%"
          >
            <template #suffix>
              <el-icon><Search /></el-icon>
            </template>
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAssignSave()">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="tsx">
import { ref, onMounted, reactive } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import { useAuth, hasAuth } from '@/hooks/useAuth'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import { ElMessage } from 'element-plus'
import {
  getInvCountingList,
  findNodesList,
  assignInvCountingTask,
  getUserByKeyword,
  removeInvCounting,
  saveInvCounting,
  updateInvCounting,
  findByDictCode,
} from '@/api'
import { useRouter } from 'vue-router'
import type { GoodsInfo } from '@/api/base/types'
import Drawer from './components/Drawer.vue'
const router = useRouter()
const { BUTTONS } = useAuthButtons()
const dialogUserVisible = ref(false)
const statusList = [
  { id: 0, name: '新建' },
  { id: 1, name: '启用' },
  { id: -1, name: '下线' },
]
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'invCountingNo',
    label: '盘点单号',
    search: { el: 'input', props: { placeholder: '盘点单号' } },
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
  { prop: 'reasonName', label: '盘点原因' },
  { prop: 'planCountingTime', label: '计划盘点时间', width: 120 },
  { prop: 'warehouseName', label: '仓库', width: 100 },
  { prop: 'storehouseName', label: '库位', width: 100 },
  { prop: 'statusName', label: '状态', width: 100 },
  { prop: 'createTime', label: '创建时间', width: 100 },
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

const invCountingTaskFormVo = reactive({
  invCountingId: '',
  countingUser: '',
  countingUserId: '',
})
const reasonList = ref()
const wareList = ref()
// 打开Dialog
const DrawerRef = ref()
const openDialog = async (
  title: string,
  rowData: Partial<GoodsInfo.ResGoodsInfoItem> = {},
) => {
  // 检查是否有操作权限
  const isAuth =
    title === '新增'
      ? hasAuth('btn.goodsInfo.add')
      : hasAuth('btn.goodsInfo.update')
  await useAuth(isAuth)

  const params = {
    title: title,
    reasonList: reasonList.value,
    wareList: wareList.value,
    rowData: { ...rowData },
    api: title === '新增' ? saveInvCounting : updateInvCounting,
    getTableList: proTable.value?.getTableList,
  }
  DrawerRef.value.acceptParams(params)
}

// *根据id删除用户
const handleDelete = async (row: GoodsInfo.ResGoodsInfoItem) => {
  await useAuth(hasAuth('btn.goodsInfo.remove'))
  await useHandleData(removeInvCounting, row.id, `删除`)
  proTable.value?.getTableList()
}

const querySearch = (queryString: string, cb: any) => {
  getUserByKeyword(queryString).then((response) => {
    cb(response.data)
  })
}

const handleSelect = (item: any) => {
  invCountingTaskFormVo.countingUserId = item.id
  invCountingTaskFormVo.countingUser = item.name
}

// *分配任务弹窗
const handleAssign = async (id: string) => {
  dialogUserVisible.value = true
  invCountingTaskFormVo.invCountingId = id
}

// *分配任务保存
const handleAssignSave = async () => {
  await assignInvCountingTask(invCountingTaskFormVo)
  ElMessage.success(`分配成功`)
  proTable.value?.getTableList()
  dialogUserVisible.value = false
}
// *查看详情
const handleView = (id: number) => {
  router.push({
    path: `/invCounting/show/${id}`,
  })
}

// 初始化原始数据
const init = () => {
  findByDictCode('Reason').then((res) => {
    reasonList.value = res.data
  })
  findNodesList().then((res) => {
    wareList.value = res.data
  })
}

/* 生命周期 */
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped></style>
