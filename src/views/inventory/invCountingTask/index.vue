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
import { ref, onMounted } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import {
  getInvCountingTaskList,
  getGoodsNodeList,
  findByDictCode,
  getConfig,
} from '@/api'
import { useRouter } from 'vue-router'
import Dialog from './components/Dialog.vue'
const router = useRouter()
// const statusList = [
//   { id: 0, name: '新建' },
//   { id: 1, name: '启用' },
//   { id: -1, name: '下线' },
// ]

const goodsTypeList = ref()

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'taskNo', label: '任务编号' },
  { prop: 'invCountingNo', label: '盘点单号', width: 120 },
  { prop: 'countingUser', label: '任务执行人', width: 100 },
  { prop: 'countingCompleteTime', label: '操作完成时间', width: 100 },
  { prop: 'statusName', label: '状态', width: 100 },
  { prop: 'createName', label: '创建人', width: 100 },
  { prop: 'createTime', label: '创建时间', width: 100 },
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

const inspectTypeList = ref()
const temperatureTypeList = ref()
const unitList = ref()
const api_url = ref()
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

// 获取货物类型数据
const featchGoodsTypeList = async () => {
  const res = await getGoodsNodeList()
  goodsTypeList.value = res.data
}

// 初始化原始数据
const init = () => {
  // 检验类型
  findByDictCode('InspectType').then((res) => {
    inspectTypeList.value = res.data
  })
  // 温度类型
  findByDictCode('TemperatureType').then((res) => {
    temperatureTypeList.value = res.data
  })
  // 单位
  findByDictCode('Unit').then((res) => {
    unitList.value = res.data
  })
  // 获取接口路径
  getConfig().then((res) => {
    api_url.value = res.data?.relationUrl
  })
}

/* 生命周期 */
onMounted(() => {
  init()
  featchGoodsTypeList()
})
</script>

<style lang="scss" scoped></style>
