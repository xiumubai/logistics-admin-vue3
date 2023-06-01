<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getStorehouseInfoList"
    >
      <template #tableHeader>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!BUTTONS['btn.warehouseInfo.add']"
          @click="openDialog('新增')"
        >
          添加
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="Edit"
          :disabled="!BUTTONS['btn.warehouseInfo.update']"
          @click="openDialog('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          icon="Delete"
          :disabled="!BUTTONS['btn.warehouseInfo.remove']"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <Dialog ref="DialogRef" />
  </div>
</template>
<script setup lang="tsx">
import { ref, onMounted, reactive } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import { useAuth, hasAuth } from '@/hooks/useAuth'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import {
  getStorehouseInfoList,
  deleteStorehouseInfoById,
  addStorehouseInfo,
  updateStorehouseInfo,
  findWarehouseInfoAll,
  findByDictCode,
} from '@/api'
import type { WarehouseInfo, StorehouseInfo } from '@/api/ware/types'
import type { Dict } from '@/api/base/types'
import Dialog from './components/Dialog.vue'
const { BUTTONS } = useAuthButtons()
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'name', label: '名称' },
  { prop: 'warehouseName', label: '仓库' },
  { prop: 'storeareaName', label: '库区' },
  { prop: 'storeshelfName', label: '货架' },
  { prop: 'builtArea', label: '面积(平方米)', width: 120 },
  { prop: 'manageName', label: '管理人' },
  { prop: 'managePhone', label: '管理人手机号', width: 120 },
  {
    prop: 'status',
    label: '状态',
    render: ({ row }) => {
      return <el-tag>{row.status === 1 ? '启用' : '停用'}</el-tag>
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

const initList = reactive({
  houseList: [] as WarehouseInfo.ResWarehouseInfoItem[],
  areaTypeList: [] as Dict.DictCodeItem[],
})

// 打开Dialog
const DialogRef = ref()
const openDialog = async (
  title: string,
  rowData: Partial<StorehouseInfo.ResStorehouseInfoItem> = {},
) => {
  const isAuth =
    title === '新增'
      ? hasAuth('btn.warehouseInfo.add')
      : hasAuth('btn.warehouseInfo.update')
  await useAuth(isAuth)

  const params = {
    title: title,
    rowData: { ...rowData },
    areaTypeList: initList.areaTypeList,
    housList: initList.houseList,
    api: title === '新增' ? addStorehouseInfo : updateStorehouseInfo,
    getTableList: proTable.value?.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// *根据id删除用户
const handleDelete = async (row: StorehouseInfo.ResStorehouseInfoItem) => {
  await useAuth(hasAuth('btn.shipperInfo.remove'))
  await useHandleData(deleteStorehouseInfoById, row.id, `删除${row.name}用户`)
  proTable.value?.getTableList()
}

// 获取省份数据
const init = () => {
  findWarehouseInfoAll().then((res) => {
    initList.houseList = res.data
  })
  findByDictCode('AreaType').then((res) => {
    initList.areaTypeList = res.data
  })
}

/* 生命周期 */
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped></style>
